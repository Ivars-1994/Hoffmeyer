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
  
  // Check for _escaped_fragment_ (old AJAX crawling scheme)
  if (url.searchParams.has('_escaped_fragment_')) {
    return true;
  }
  
  // Check user agent
  const userAgent = request.headers.get('user-agent') || '';
  return isBot(userAgent);
}

export default async function handler(request: Request, context: any) {
  // Only handle GET requests
  if (request.method !== 'GET') {
    return context.next();
  }
  
  if (!shouldPrerender(request)) {
    return context.next();
  }
  
  const prerenderToken = Deno.env.get('PRERENDER_TOKEN');
  
  if (!prerenderToken) {
    console.error('PRERENDER_TOKEN not configured');
    return context.next();
  }
  
  const url = new URL(request.url);
  // Prerender.io expects the full URL after the service URL
  // Format: https://service.prerender.io/https://www.example.com/page
  const targetUrl = url.href;
  const prerenderUrl = `https://service.prerender.io/${targetUrl}`;
  
  try {
    const response = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
        'User-Agent': request.headers.get('user-agent') || 'Netlify Edge Function'
      }
    });
    
    if (!response.ok) {
      console.error(`Prerender returned ${response.status}`);
      return context.next();
    }
    
    const html = await response.text();
    
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Prerendered': 'true',
        'Cache-Control': 'public, max-age=86400' // Cache for 24h
      }
    });
  } catch (error) {
    console.error('Prerender error:', error);
    return context.next();
  }
}

export const config = {
  path: "/*"
};
