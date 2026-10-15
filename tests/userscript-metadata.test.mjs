import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const script = readFileSync('vaft/vaft.user.js', 'utf8');
const canonicalUrl = 'https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/vaft/vaft.user.js';

function metadata(key) {
  const prefix = '// @' + key;
  const line = script.split('\n').find((entry) => entry.startsWith(prefix + ' '));
  assert.ok(line, 'Missing userscript metadata: ' + key);
  return line.slice(prefix.length).trim();
}

test('VAFT userscript uses independent AtomicTTV update endpoints', () => {
  assert.equal(metadata('name'), 'AtomicTTV (VAFT)');
  assert.equal(metadata('namespace'), 'https://github.com/MarcelloAtomic/AtomicTTV');
  assert.equal(metadata('version'), '37.0.1');
  assert.equal(metadata('updateURL'), canonicalUrl);
  assert.equal(metadata('downloadURL'), canonicalUrl);
});

test('VAFT runs as an early page-context userscript on Twitch', () => {
  assert.equal(metadata('match'), '*://*.twitch.tv/*');
  assert.equal(metadata('run-at'), 'document-start');
  assert.equal(metadata('inject-into'), 'page');
  assert.equal(metadata('grant'), 'none');
});

test('VAFT keeps its compatibility guard and original author credit', () => {
  assert.ok(script.includes('twitchAdSolutionsVersion'));
  assert.ok(script.includes('https://github.com/cleanlock/VideoAdBlockForTwitch#credits'));
});
