import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const slugs = ['maeusebekaempfung', 'marderbekaempfung'];
for (const slug of slugs) {
  test(`${slug} has a canonical trailing-slash redirect before the fallback`, () => {
    const redirects = readFileSync('public/_redirects', 'utf8');
    const match = new RegExp(`^/${slug}\\s+/${slug}/\\s+301$`, 'm').exec(redirects);
    assert.ok(match);
    assert.ok(match.index < redirects.indexOf('/*'));
    const netlify = readFileSync('netlify.toml', 'utf8');
    const rule = `from = "/${slug}"\n  to = "/${slug}/"\n  status = 301`;
    assert.ok(netlify.includes(rule));
    assert.ok(netlify.indexOf(rule) < netlify.indexOf('from = "/*"'));
  });

  test(`${slug} links to the five other services without linking to itself`, () => {
    const page = readFileSync(`public/${slug}/index.html`, 'utf8');
    const section = page.match(/<section[^>]*id="weitere-schaedlinge"[\s\S]*?<\/section>/)?.[0] ?? '';
    const destinations = [...section.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
    const expected = ['rattenbekaempfung', 'maeusebekaempfung', 'marderbekaempfung', 'bettwanzenbekaempfung', 'wespennest-entfernen', 'kakerlakenbekaempfung']
      .filter(other => other !== slug).map(other => `/${other}/`).concat('/');
    assert.deepEqual(destinations.sort(), expected.sort());
  });
}