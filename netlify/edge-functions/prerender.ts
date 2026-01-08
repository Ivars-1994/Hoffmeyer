// Netlify Edge Function for Prerender.io
// Detects bots and forwards requests to Prerender service

const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'yandex',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'pinterestbot',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'whatsapp',
  'redditbot',
  'applebot',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'qwantify',
  'developers.google.com/+/web/snippet',
  'google-inspectiontool',
  'chrome-lighthouse',
  'telegrambot'
];

const IGNORED_EXTENSIONS = [
  '.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg', '.gif', '.pdf',
  '.doc', '.txt', '.ico', '.rss', '.zip', '.mp3', '.rar', '.exe', '.wmv',
  '.doc', '.avi', '.ppt', '.mpg', '.mpeg', '.tif', '.wav', '.mov', '.psd',
  '.ai', '.xls', '.mp4', '.m4a', '.swf', '.dat', '.dmg', '.iso', '.flv',
  '.m4v', '.torrent', '.ttf', '.woff', '.woff2', '.svg', '.webp', '.webm'
];

function getEnv(name: string): string | undefined {
  const netlifyEnv = (globalThis as any)?.Netlify?.env;
  if (netlifyEnv?.get) {
    const v = netlifyEnv.get(name);
    if (typeof v === 'string' && v.length > 0) return v;
  }

  const denoEnv = (globalThis as any)?.Deno?.env;
  if (denoEnv?.get) {
    try {
      const v = denoEnv.get(name);
      if (typeof v === 'string' && v.length > 0) return v;
    } catch {
      // ignore
    }
  }

  return undefined;
}

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

function shouldPrerender(request: Request): boolean {
  const url = new URL(request.url);
  const path = url.pathname.toLowerCase();

  // Skip static assets
  if (IGNORED_EXTENSIONS.some(ext => path.endsWith(ext))) {
    return false;
  }

  // Skip API routes and functions
  if (path.startsWith('/api/') || path.startsWith('/.netlify/')) {
    return false;
  }

  // Avoid infinite loops when Prerender itself crawls the site
  const userAgent = request.headers.get('user-agent') || '';
  const ua = userAgent.toLowerCase();
  if (ua.includes('prerender') || request.headers.has('x-prerender') || request.headers.has('x-prerendered')) {
    return false;
  }

  // Check for _escaped_fragment_ (old AJAX crawling scheme)
  if (url.searchParams.has('_escaped_fragment_')) {
    return true;
  }

  // Check user agent
  return isBot(userAgent);
}

export default async function handler(request: Request, context: any) {
  // Only handle GET requests
  if (request.method !== 'GET') {
    return context.next();
  }

  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  const requestId = crypto.randomUUID();

  // Simple health/debug endpoint to verify the Edge Function is running on Netlify
  if (url.pathname === '/__prerender/health' || url.searchParams.has('__prerender_debug')) {
    const info = {
      ok: true,
      requestId,
      url: url.href,
      path: url.pathname,
      userAgent,
      isBot: isBot(userAgent),
      shouldPrerender: shouldPrerender(request),
      hasToken: Boolean(getEnv('PRERENDER_TOKEN')),
    };

    return new Response(JSON.stringify(info, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  const willPrerender = shouldPrerender(request);
  console.log(
    `[prerender][${requestId}] ${url.pathname}${url.search} willPrerender=${willPrerender} ua="${userAgent}"`
  );

  if (!willPrerender) {
    return context.next();
  }

  const prerenderToken = getEnv('PRERENDER_TOKEN');

  if (!prerenderToken) {
    console.error(`[prerender][${requestId}] PRERENDER_TOKEN not configured`);
    return context.next();
  }

  // Prerender.io expects the full URL after the service URL
  // Format: https://service.prerender.io/https://www.example.com/page
  const targetUrl = url.href;
  const prerenderUrl = `https://service.prerender.io/${targetUrl}`;

  try {
    const response = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
        'User-Agent': userAgent || 'Netlify Edge Function',
        'Accept': 'text/html',
      },
    });

    console.log(`[prerender][${requestId}] Prerender status=${response.status}`);

    if (response.status >= 400) {
      const bodySnippet = (await response.text()).slice(0, 300);
      console.error(
        `[prerender][${requestId}] Prerender failed status=${response.status} body="${bodySnippet}"`
      );
      return context.next();
    }

    const html = await response.text();

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Prerendered': 'true',
        'X-Prerender-Status': String(response.status),
        'Cache-Control': 'public, max-age=86400',
        'Vary': 'User-Agent',
      },
    });
  } catch (error) {
    console.error(`[prerender][${requestId}] Prerender error:`, error);
    return context.next();
  }
}

export const config = {
  path: "/*",
  excludedPath: ["/assets/*", "/.netlify/*", "/api/*"]
};
