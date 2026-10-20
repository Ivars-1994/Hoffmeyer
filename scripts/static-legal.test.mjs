import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OFFLINE = ['impressum', 'datenschutz'];
const OFFLINE_HREFS = OFFLINE.map((p) => `href="/${p}/"`);

function htmlFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

const served = htmlFiles('public');

test('impressum and datenschutz are offline', () => {
  for (const page of OFFLINE) {
    assert.equal(existsSync(`public/${page}/index.html`), false, `public/${page}/index.html must not be served`);
    assert.equal(existsSync(`public/${page}`), false, `public/${page} must not exist`);
  }
});

test('no served page links to impressum or datenschutz', () => {
  for (const file of served) {
    const text = readFileSync(file, 'utf8');
    for (const href of OFFLINE_HREFS) {
      assert.equal(
        text.includes(href),
        false,
        `${file} still links ${href} while the page is offline`
      );
    }
  }
});

test('sitemap and redirects do not advertise impressum or datenschutz', () => {
  const sitemap = readFileSync('public/sitemap.xml', 'utf8');
  const redirects = readFileSync('public/_redirects', 'utf8');
  const netlify = readFileSync('netlify.toml', 'utf8');
  for (const page of OFFLINE) {
    assert.equal(sitemap.includes(`/${page}`), false, `sitemap.xml still lists /${page}`);
    assert.equal(redirects.includes(`/${page}`), false, `_redirects still routes /${page}`);
    assert.equal(netlify.includes(`/${page}`), false, `netlify.toml still routes /${page}`);
  }
});

test('agb stays online and linked from every served page footer', () => {
  assert.equal(existsSync('public/agb/index.html'), true);
  const sitemap = readFileSync('public/sitemap.xml', 'utf8');
  assert.match(sitemap, /https:\/\/kammerjaeger-bismarck\.de\/agb/);
  for (const file of served) {
    if (file === 'public/agb/index.html') continue; // the AGB page itself carries no footer
    const text = readFileSync(file, 'utf8');
    assert.equal(
      text.includes('href="/agb/"'),
      true,
      `${file} lost its AGB footer link`
    );
  }
});

test('the offline copies keep the existing global business address without an invented city', () => {
  for (const page of OFFLINE) {
    const text = readFileSync(`disabled-legal/${page}/index.html`, 'utf8');
    assert.match(text, /Hauptstraße 26–28/);
    assert.doesNotMatch(text, /Hauptstraße 26–36|Martin-Luther-Straße|45145|\{cityInfo\.city\}/);
  }
});
