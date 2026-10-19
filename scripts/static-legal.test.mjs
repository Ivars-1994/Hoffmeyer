import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('static legal pages retain the existing global business address without an invented city', () => {
  for (const page of ['impressum', 'datenschutz']) {
    const text = readFileSync(`public/${page}/index.html`, 'utf8');
    assert.match(text, /Hauptstraße 26–28/);
    assert.doesNotMatch(text, /Hauptstraße 26–36|Martin-Luther-Straße|45145|\{cityInfo\.city\}/);
  }
});