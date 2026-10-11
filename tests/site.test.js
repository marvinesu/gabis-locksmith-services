const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..', 'public');
const home = readFileSync(join(root, 'index.html'), 'utf8');

test('publishes a canonical North Hollywood location page', () => {
  const path = join(root, 'locations', 'north-hollywood', 'index.html');
  assert.ok(existsSync(path));
  const page = readFileSync(path, 'utf8');
  assert.match(page, /Locksmith service in North Hollywood, California/);
  assert.match(page, /BreadcrumbList/);
  assert.match(page, /rel="canonical" href="https:\/\/gabislocksmithservices\.com\/locations\/north-hollywood\/"/);
});

test('removes unverifiable speed and fee guarantees', () => {
  assert.doesNotMatch(home, /30 minutes or less/i);
  assert.doesNotMatch(home, /no hidden fees/i);
  assert.match(home, /Call to confirm current availability/i);
});

test('publishes business identity and matching hours schema', () => {
  assert.match(home, /"@type":"Locksmith"/);
  assert.match(home, /"streetAddress":"6160 Laurelgrove Ave"/);
  assert.match(home, /"dayOfWeek":"Saturday","opens":"18:00","closes":"23:59"/);
});

test('serves a real noindex 404 instead of the homepage for unknown paths', () => {
  const page = readFileSync(join(root, '404.html'), 'utf8');
  const worker = readFileSync(join(__dirname, '..', 'wrangler.jsonc'), 'utf8');
  assert.match(page, /name="robots" content="noindex,follow"/);
  assert.match(page, /This page could not be found/);
  assert.match(worker, /"not_found_handling": "404-page"/);
});
