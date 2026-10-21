import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

const files = ['index.html', ...filesIn('public'), ...filesIn('src'), ...filesIn('netlify'), ...filesIn('supabase')]
  .filter(path => /\.(html|tsx?|js|json|txt|xml)$/.test(path));
const contents = files.map(path => ({ path, text: readFileSync(path, 'utf8') }));

test('every static call link uses the requested 01781196025 number', () => {
  let count = 0;
  for (const { path, text } of contents.filter(file => file.path.endsWith('.html'))) {
    for (const match of text.matchAll(/href=["']tel:([^"']+)["']/g)) {
      count++;
      assert.equal(match[1], '+491781196025', path);
    }
  }
  assert.ok(count > 100, 'All static call links must be checked');
  for (const { path, text } of contents) {
    assert.doesNotMatch(text, /01511[\s/-]*4310957|4915114310957/, path);
    for (const match of text.matchAll(/(?:PHONE_NUMBER|CALL)\s*=\s*["']([^"']+)/g)) {
      assert.ok(['+491781196025', 'tel:+491781196025'].includes(match[1]), path);
    }
  }
});

test('Bismarck replaces all prior Kellermann brand references', () => {
  for (const { path, text } of contents) {
    assert.doesNotMatch(text, /kellermann/i, path);
    assert.doesNotMatch(path, /kellermann/i, path);
  }
  const homepage = readFileSync('index.html', 'utf8');
  const identity = JSON.parse(homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? '{}');
  assert.equal(identity.name, 'Kammerjäger Bismarck');
  assert.equal(identity.telephone, '+491781196025');
});

test('brand is spelled Bismarck with ck on every page and asset name', () => {
  // German town data legitimately contains the place name "Bismark" (Altmark).
  const townData = /^(public\/de-cities\.json|netlify\/functions\/stadt_map_complete\.json)$/;
  for (const { path, text } of contents) {
    if (townData.test(path)) continue;
    assert.doesNotMatch(text, /bismark(?!c)/i, path);
    assert.doesNotMatch(path, /bismark(?!c)/i, path);
  }
  assert.match(readFileSync('index.html', 'utf8'), /Kammerjäger Bismarck/);
});


test('only the new GTM-NPG6WGFF container is active; no legacy tracking remains', () => {
  const htmlFiles = contents.filter(file => file.path.endsWith('.html'));
  for (const { path, text } of htmlFiles) {
    // The telclick fallback script legitimately references the container ID once
    // to detect whether GTM has loaded; exclude it before counting.
    const withoutFallback = text.replace(/<script>\(function\(\)\{if\(window\.__tcFallback\)[\s\S]*?<\/script>/, '');
    // New container present exactly twice per page (head script + body noscript).
    assert.equal(withoutFallback.match(/GTM-NPG6WGFF/g)?.length ?? 0, 2, path);
  }
  for (const { path, text } of contents) {
    assert.doesNotMatch(text, /GTM-(?!NPG6WGFF)[A-Z0-9]+|AW-\d+|google-analytics\.com|clickcease\.com|window\.gtag/i, path);
  }
});