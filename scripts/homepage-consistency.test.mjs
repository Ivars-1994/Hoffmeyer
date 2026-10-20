import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

test('homepage source and built copies are synchronized even after Vite overwrites index', () => {
  const dir = mkdtempSync(join(tmpdir(), 'homepage-sync-'));
  try {
    mkdirSync(join(dir, 'public'));
    mkdirSync(join(dir, 'dist'));
    writeFileSync(join(dir, 'public/static-home.html'), 'authoritative homepage');
    writeFileSync(join(dir, 'public/index.html'), 'old homepage');
    writeFileSync(join(dir, 'dist/index.html'), 'Vite entry');
    execFileSync(process.execPath, [resolve('scripts/sync-homepage.mjs'), '--dist'], { cwd: dir });
    for (const file of ['public/index.html', 'dist/index.html', 'dist/static-home.html']) {
      assert.equal(readFileSync(join(dir, file), 'utf8'), 'authoritative homepage');
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('/index.html permanently redirects to the canonical homepage before the fallback', () => {
  const redirects = readFileSync('public/_redirects', 'utf8');
  const rule = /^\/index\.html\s+\/\s+301!$/m.exec(redirects);
  assert.ok(rule);
  assert.ok(rule.index < redirects.indexOf('/*'));
  const netlify = readFileSync('netlify.toml', 'utf8');
  assert.ok(netlify.includes('from = "/index.html"\n  to = "/"\n  status = 301\n  force = true'));
});