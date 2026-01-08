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
  'telegrambot',
];

const IGNORED_EXTENSIONS = [
  '.js',
  '.css',
  '.xml',
  '.less',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.pdf',
  '.doc',
  '.txt',
  '.ico',
  '.rss',
  '.zip',
  '.mp3',
  '.rar',
  '.exe',
  '.wmv',
  '.doc',
  '.avi',
  '.ppt',
  '.mpg',
  '.mpeg',
  '.tif',
  '.wav',
  '.mov',
  '.psd',
  '.ai',
  '.xls',
  '.mp4',
  '.m4a',
  '.swf',
  '.dat',
  '.dmg',
  '.iso',
  '.flv',
  '.m4v',
  '.torrent',
  '.ttf',
  '.woff',
  '.woff2',
  '.svg',
  '.webp',
  '.webm',
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
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

type PrerenderDecision = {
  shouldPrerender: boolean;
  reason: string;
  debug: {
    path: string;
    ignoredExtension: string | null;
    isApiOrNetlify: boolean;
    escapedFragment: boolean;
    isBot: boolean;
    hasXPrerender: boolean;
    hasXPrerendered: boolean;
    isPrerenderLoop: boolean;
  };
};

function getPrerenderDecision(request: Request): PrerenderDecision {
  const url = new URL(request.url);
  const path = url.pathname.toLowerCase();

  const ignoredExtension =
    IGNORED_EXTENSIONS.find((ext) => path.endsWith(ext)) ?? null;
  if (ignoredExtension) {
    return {
      shouldPrerender: false,
      reason: `ignored_extension:${ignoredExtension}`,
      debug: {
        path,
        ignoredExtension,
        isApiOrNetlify: false,
        escapedFragment: false,
        isBot: false,
        hasXPrerender: request.headers.has('x-prerender'),
        hasXPrerendered: request.headers.has('x-prerendered'),
        isPrerenderLoop: false,
      },
    };
  }

  const isApiOrNetlify =
    path.startsWith('/api/') || path.startsWith('/.netlify/');
  if (isApiOrNetlify) {
    return {
      shouldPrerender: false,
      reason: 'internal_path',
      debug: {
        path,
        ignoredExtension: null,
        isApiOrNetlify: true,
        escapedFragment: false,
        isBot: false,
        hasXPrerender: request.headers.has('x-prerender'),
        hasXPrerendered: request.headers.has('x-prerendered'),
        isPrerenderLoop: false,
      },
    };
  }

  // Avoid infinite loops when Prerender itself crawls the site to generate cache
  // x-prerender: On = Prerender.io signaling it WANTS us to prerender (proceed!)
  // x-prerendered = Already prerendered response (don't re-prerender)
  // UA contains "prerender" = Prerender's crawler fetching the original page
  const userAgent = request.headers.get('user-agent') || '';
  const ua = userAgent.toLowerCase();
  const hasXPrerender = request.headers.has('x-prerender');
  const hasXPrerendered = request.headers.has('x-prerendered');
  
  // Only block if this is Prerender's own crawler OR already prerendered
  const isPrerenderCrawler = ua.includes('prerender');
  const isAlreadyPrerendered = hasXPrerendered;
  const isPrerenderLoop = isPrerenderCrawler || isAlreadyPrerendered;

  if (isPrerenderLoop) {
    return {
      shouldPrerender: false,
      reason: isPrerenderCrawler ? 'prerender_crawler' : 'already_prerendered',
      debug: {
        path,
        ignoredExtension: null,
        isApiOrNetlify: false,
        escapedFragment: false,
        isBot: isBot(userAgent),
        hasXPrerender,
        hasXPrerendered,
        isPrerenderLoop: true,
      },
    };
  }

  const escapedFragment = url.searchParams.has('_escaped_fragment_');
  if (escapedFragment) {
    return {
      shouldPrerender: true,
      reason: '_escaped_fragment_',
      debug: {
        path,
        ignoredExtension: null,
        isApiOrNetlify: false,
        escapedFragment: true,
        isBot: isBot(userAgent),
        hasXPrerender,
        hasXPrerendered,
        isPrerenderLoop: false,
      },
    };
  }

  const bot = isBot(userAgent);
  return {
    shouldPrerender: bot,
    reason: bot ? 'bot_user_agent' : 'not_a_bot',
    debug: {
      path,
      ignoredExtension: null,
      isApiOrNetlify: false,
      escapedFragment: false,
      isBot: bot,
      hasXPrerender,
      hasXPrerendered,
      isPrerenderLoop: false,
    },
  };
}

export default async function handler(request: Request, context: any) {
  // Only handle GET requests
  if (request.method !== 'GET') {
    return context.next();
  }

  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  const requestId = crypto.randomUUID();
  const decision = getPrerenderDecision(request);

  // Simple health/debug endpoint to verify the Edge Function is running on Netlify
  if (
    url.pathname === '/__prerender/health' ||
    url.searchParams.has('__prerender_debug')
  ) {
    const info = {
      ok: true,
      requestId,
      url: url.href,
      path: url.pathname,
      userAgent,
      hasToken: Boolean(getEnv('PRERENDER_TOKEN')),
      decision,
      headers: {
        xPrerender: request.headers.get('x-prerender'),
        xPrerendered: request.headers.get('x-prerendered'),
        via: request.headers.get('via'),
      },
    };

    return new Response(JSON.stringify(info, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  console.log(
    `[prerender][${requestId}] ${url.pathname}${url.search} willPrerender=${decision.shouldPrerender} reason=${decision.reason} ua="${userAgent}"`
  );

  if (!decision.shouldPrerender) {
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
        Accept: 'text/html',
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
        Vary: 'User-Agent',
      },
    });
  } catch (error) {
    console.error(`[prerender][${requestId}] Prerender error:`, error);
    return context.next();
  }
}

export const config = {
  path: '/*',
  excludedPath: ['/assets/*', '/.netlify/*', '/api/*'],
};
