import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('atomicttv/atomicttv.user.js', 'utf8');
const resource = readFileSync('atomicttv/atomicttv-ublock-origin.js', 'utf8');

test('uBO scriptlet registers the original Twitch video ad identifier', () => {
  assert.equal(resource.split('\n')[0], 'twitch-videoad.js text/javascript');
  assert.ok(resource.includes('if (!/(^|\\.)twitch\\.tv$/.test(document.location.hostname)) { return; }'));
  assert.ok(resource.includes('(function () {'));
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
  assert.ok(source.includes('// @version      1.0.0'));
  assert.ok(resource.includes('// AtomicTTV 1.0.0 | uBlock Origin custom scriptlet'));
  const copyright = readFileSync('THIRD_PARTY_NOTICES.md', 'utf8');
  assert.match(copyright, /scamorza\/TwitchAdBlock/);
  assert.match(copyright, /pixeltris\/TwitchAdSolutions/);
});
