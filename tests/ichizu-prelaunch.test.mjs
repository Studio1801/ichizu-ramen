import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import { track, trackLink } from '../artifacts/ichizu-ramen/src/lib/track.ts';

const app = new URL('../artifacts/ichizu-ramen/', import.meta.url);
const read = (path) => readFileSync(new URL(path, app), 'utf8');
const html = read('index.html');
const home = read('src/pages/Home.tsx');
const below = read('src/pages/HomeBelowFold.tsx');

test('one supported action sends one custom event with the required fields', () => {
  const calls = [];
  globalThis.window = { location: { href: 'https://example.test/' }, gtag: (...args) => calls.push(args) };
  const link = { href: 'https://www.google.com/maps/dir/?api=1', innerText: ' Get\n directions ', textContent: 'Get directions' };
  trackLink('directions_click', link);
  assert.deepEqual(calls, [['event', 'directions_click', {
    link_url: link.href, link_text: 'Get directions', page_location: 'https://example.test/',
  }]]);
  delete globalThis.window;
});

test('missing or blocked analytics cannot break an interaction', () => {
  assert.doesNotThrow(() => track('directions_click'));
  globalThis.window = { location: { href: 'https://example.test/' } };
  assert.doesNotThrow(() => trackLink('directions_click', { href: 'https://maps.google.com', textContent: '' }));
  globalThis.window.gtag = () => { throw new Error('blocked'); };
  assert.doesNotThrow(() => track('directions_click'));
  delete globalThis.window;
});

test('navigation never claims a reservation or fires unsupported events', () => {
  assert.equal((home.match(/Visit Us/g) || []).length, 2);
  assert.doesNotMatch(home + below, /reserve_click|reservation_click|order_online_click|phone_click/);
  assert.doesNotMatch(below, /addEventListener/);
  assert.equal((below.match(/trackLink\('directions_click'/g) || []).length, 2);
});

test('approved content replaces placeholder history', () => {
  for (const name of ['Keizo Shimamoto', 'Takeshi Koitani', 'Daisuke Watanabe', 'Takuro Yanase', 'Yakitori Guy']) assert.ok(below.includes(name));
  assert.ok(below.includes('100% house-made. Never stop refining.'));
  assert.doesNotMatch(below, /Hana Ramen Bar|late-night counter|No takeout|No substitutions/);
});

test('preview is non-indexable and contains no premature production URLs', () => {
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html + read('public/robots.txt'), /ramenichizu\.com|ramenichizubar\.com|rel="canonical"|Sitemap:/);
  assert.equal(existsSync(new URL('public/sitemap.xml', app)), false);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.name, 'Ramen Ichizu & Bar');
  assert.equal(schema.url, undefined);
  const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.ok(vercel.headers[0].headers.some(h => h.key === 'X-Robots-Tag' && h.value === 'noindex, nofollow'));
});

test('one correct GA4 tag loads on top-level deployments, never local or framed previews', () => {
  const script = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
  const run = (hostname, framed = false) => {
    const scripts = [];
    const top = {};
    const window = { location: { hostname }, top };
    window.self = framed ? {} : top;
    vm.runInNewContext(script, { window, document: { createElement: () => ({}), head: { appendChild: (s) => scripts.push(s) } } });
    return { scripts, window };
  };
  for (const hostname of ['localhost', '127.0.0.1', '[::1]']) assert.equal(run(hostname).scripts.length, 0);
  assert.equal(run('preview.vercel.app', true).scripts.length, 0);
  const result = run('preview.vercel.app');
  assert.equal(result.scripts.length, 1);
  assert.equal(result.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-B5BQ9J2SD0');
  assert.equal(result.window.dataLayer.filter(args => args[0] === 'config').length, 1);
  assert.doesNotMatch(html, /G-E2B9ZJRX98/);
});
