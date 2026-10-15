import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, runInNewContext } from 'node:vm';
import { readUblockScriptlet } from '../scripts/lib/ublock-resource.mjs';

const source = readFileSync('atomicttv/atomicttv.user.js', 'utf8');
const resource = readFileSync('atomicttv/atomicttv-ublock-origin.js', 'utf8');

test('uBO scriptlet registers the original Twitch video ad identifier', () => {
  assert.equal(resource.split(/\r?\n/)[0], 'twitch-videoad.js text/javascript');
  assert.ok(resource.includes('if (!/(^|\\.)twitch\\.tv$/.test(document.location.hostname)) { return; }'));
  assert.ok(resource.includes('(function () {'));
});

test('uBO receives the complete scriptlet, including the bootstrap', () => {
  const parsed = readUblockScriptlet(resource);
  assert.doesNotThrow(() => new Script('try {\n' + parsed + '\n} catch (error) {}'));
  assert.ok(parsed.includes('window.atomicTTV = window.vaft2;'));
  assert.ok(parsed.includes('window.__vaft2RealFetch = realFetch;'));
});

test('blank resource boundaries reproduce the injection failure', () => {
  for (const blank of ['', '   ', '\t']) {
    const fixture = 'twitch-videoad.js text/javascript\n(function () {\n' + blank + '\n})();\n';
    const parsed = readUblockScriptlet(fixture);
    assert.throws(() => new Script('try {\n' + parsed + '\n} catch (error) {}'), SyntaxError);
  }
});

test('resource parser handles CRLF and resource comments', () => {
  const fixture = 'twitch-videoad.js text/javascript\r\n// comment\r\n# comment\r\nvoid 0;\r\n\r\nignored\r\n';
  assert.equal(readUblockScriptlet(fixture), 'void 0;');
});

test('parsed scriptlet initializes diagnostics and hooks on Twitch', () => {
  const storage = new Map();
  const events = [];
  const timers = [];
  const logs = [];
  const location = new URL('https://www.twitch.tv/test_channel');
  const realFetch = () => { throw new Error('Unexpected network request in startup test'); };
  const NativeWorker = class {};
  const window = {
    fetch: realFetch, Worker: NativeWorker,
    addEventListener: (name) => events.push(name),
  };
  window.self = window.top = window;
  const context = {
    window, location, URL,
    document: {
      location, readyState: 'loading', visibilityState: 'visible',
      addEventListener: (name) => events.push(name),
      querySelector: () => null, querySelectorAll: () => [],
    },
    navigator: { userAgent: 'Chromium' },
    history: { pushState() {}, replaceState() {} },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key),
    },
    setTimeout: (fn, delay) => timers.push({ fn, delay }),
    setInterval: (fn, delay) => timers.push({ fn, delay }),
    console: { log: (...args) => logs.push(args.join(' ')), warn: (...args) => logs.push(args.join(' ')) },
  };
  runInNewContext(readUblockScriptlet(resource), context, { timeout: 1000 });
  assert.equal(window.atomicTTV, window.vaft2);
  assert.equal(typeof window.atomicTTV?.status, 'function');
  assert.equal(window.atomicTTV.status().version, '1.0.2');
  assert.equal(window.__vaft2RealFetch, realFetch);
  assert.notEqual(window.fetch, realFetch);
  assert.notEqual(window.Worker, NativeWorker);
  assert.equal(window.vaftVersion, 1000);
  assert.equal(window.twitchAdSolutionsVersion, 1000);
  assert.ok(events.includes('DOMContentLoaded'));
  assert.ok(logs.some((line) => line.startsWith('[VAFT2] v2 active -- ')));
  assert.ok(timers.length > 0);
});

test('modern engine is included in the uBO variant, not legacy VAFT', () => {
  const marker = 'const WORKER_SOURCE = ' + String.fromCharCode(96);
  assert.ok(source.includes(marker));
  assert.ok(resource.includes(marker));
  assert.ok(resource.includes('window.atomicTTV = window.vaft2;'));
  assert.ok(resource.includes("BackupPlayerTypes: ['mobile_feed', 'popout', 'autoplay']"));
  assert.ok(!resource.includes('scope.BackupPlayerTypes = ['));
});

test('source and resource reflect the same engine version and attribution', () => {
  assert.ok(source.includes('// @version      1.0.2'));
  assert.ok(resource.includes('// AtomicTTV 1.0.2 | uBlock Origin custom scriptlet'));
  const copyright = readFileSync('THIRD_PARTY_NOTICES.md', 'utf8');
  assert.match(copyright, /scamorza\/TwitchAdBlock/);
  assert.match(copyright, /pixeltris\/TwitchAdSolutions/);
});
