import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const script = readFileSync('atomicttv/atomicttv.user.js', 'utf8');
const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
function meta(name) {
  const line = script.split('\n').find((s) => s.startsWith('// @' + name + ' '));
  assert.ok(line, 'missing userscript ' + name);
  return line.slice(name.length + 4).trim();
}
test('AtomicTTV userscript has independent update URLs and version', () => {
  const url = 'https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv.user.js';
  assert.equal(meta('name'), 'AtomicTTV');
  assert.equal(meta('version'), manifest.version);
  assert.equal(meta('namespace'), 'https://github.com/MarcelloAtomic/AtomicTTV');
  assert.equal(meta('updateURL'), url);
  assert.equal(meta('downloadURL'), url);
});
test('Chromium extension injects only on Twitch', () => {
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.content_scripts.length, 1);
  assert.equal(manifest.content_scripts[0].world, 'MAIN');
  assert.equal(manifest.content_scripts[0].run_at, 'document_start');
  assert.deepEqual(manifest.content_scripts[0].js, ['atomicttv/atomicttv.user.js']);
  assert.deepEqual(manifest.content_scripts[0].matches, ['https://*.twitch.tv/*']);
  assert.deepEqual(manifest.permissions ?? [], []);
  assert.deepEqual(manifest.host_permissions ?? [], []);
});
test('modern engine retains conflict detection, fallback and diagnostics', () => {
  assert.match(script, /const OUR_VERSION = 1000;/);
  assert.match(script, /VERSION_MARKERS = \['vaftVersion', 'twitchAdSolutionsVersion'\]/);
  assert.match(script, /window\.atomicTTV = window\.vaft2;/);
  assert.match(script, /BackupPlayerTypes: \['mobile_feed', 'popout', 'autoplay'\]/);
  assert.match(script, /function parsePlaylist\(/);
  assert.match(script, /function ledgerAbsorb\(/);
  assert.match(script, /function servePlaylist\(/);
});
test('preserves copyrights and credits from both upstream authors', () => {
  const notices = readFileSync('THIRD_PARTY_NOTICES.md', 'utf8');
  const license = readFileSync('LICENSE', 'utf8');
  assert.match(notices, /scamorza\/TwitchAdBlock/);
  assert.match(notices, /pixeltris\/TwitchAdSolutions/);
  assert.match(license, /MIT License/);
  assert.match(license, /TwitchAdBlock Contributors/);
});
