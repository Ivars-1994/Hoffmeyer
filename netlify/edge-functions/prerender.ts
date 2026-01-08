import type { Context } from "https://edge.netlify.com";

// Bot User-Agents die vorgerendert werden sollen

const BOT_AGENTS = [

'googlebot',

'yahoo! slurp',

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

'developers.google.com/+/web/snippet',

'slackbot',

'vkshare',

'w3c_validator',

'redditbot',

'applebot',

'whatsapp',

'flipboard',

'tumblr',

'bitlybot',

'skypeuripreview',

'nuzzel',

'discordbot',

'google page speed',

'qwantify',

'pinterestbot',

'bitrix link preview',

'xing-contenttabreceiver',

'chrome-lighthouse',

'telegrambot',

'google-inspectiontool',

'petalbot',

'adsbot-google',

'mediapartners-google'

];

// Dateierweiterungen die nicht vorgerendert werden sollen

const IGNORED_EXTENSIONS = [

'.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg', '.gif',

'.pdf', '.doc', '.txt', '.ico', '.rss', '.zip', '.mp3', '.rar',

'.exe', '.wmv', '.avi', '.ppt', '.mpg', '.mpeg', '.tif', '.wav',

'.mov', '.psd', '.ai', '.xls', '.mp4', '.m4a', '.swf', '.dat',

'.dmg', '.iso', '.flv', '.m4v', '.torrent', '.ttf', '.woff',

'.woff2', '.svg', '.webp', '.avif'

];

function isBot(userAgent: string): boolean {

const ua = userAgent.toLowerCase();

return BOT_AGENTS.some(bot => ua.includes(bot));

}

function shouldPrerender(request: Request): boolean {

const url = new URL(request.url);

const userAgent = request.headers.get('user-agent') || '';

// Prüfe auf ignorierte Dateierweiterungen

const pathname = url.pathname.toLowerCase();

if (IGNORED_EXTENSIONS.some(ext => pathname.endsWith(ext))) {

return false;


}

// Prüfe auf Bot User-Agent

if (!isBot(userAgent)) {

return false;


}

// Keine Prerender für API-Aufrufe

if (pathname.startsWith('/api/') || pathname.startsWith('/.netlify/')) {

return false;


}

return true;

}

export default async function handler(request: Request, context: Context) {

// Nur GET-Anfragen vorrendern

if (request.method !== 'GET') {

return context.next();


}

// Prüfe ob Prerender notwendig ist

if (!shouldPrerender(request)) {

return context.next();


}

const prerenderToken = Deno.env.get('PRERENDER_TOKEN');

if (!prerenderToken) {

console.error('PRERENDER_TOKEN nicht konfiguriert');

return context.next();


}

const url = new URL(request.url);

const prerenderUrl = `https://service.prerender.io/${url.href}`;

console.log(`[Prerender] Bot erkannt, leite weiter: ${url.href}`);

try {

const response = await fetch(prerenderUrl, {

  headers: {

    'X-Prerender-Token': prerenderToken,

    'User-Agent': request.headers.get('user-agent') || '',

    'Accept': 'text/html',

  },

});



if (!response.ok) {

  console.error(`[Prerender] Fehler: ${response.status} ${response.statusText}`);

  return context.next();

}



const html = await response.text();



return new Response(html, {

  status: response.status,

  headers: {

    'Content-Type': 'text/html; charset=utf-8',

    'X-Prerender': 'true',

    'Cache-Control': 'public, max-age=3600',

  },

});


} catch (error) {

console.error('[Prerender] Fehler:', error);

return context.next();


}

}

export const config = {

path: "/*",

};