import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import { readUblockScriptlet } from '../scripts/lib/ublock-resource.mjs';

for (const [variant, script] of [
  ['userscript', readFileSync('atomicttv/atomicttv.user.js', 'utf8').replace(/\r\n/g, '\n')],
  ['uBO-parsed resource', readUblockScriptlet(readFileSync('atomicttv/atomicttv-ublock-origin.js', 'utf8'))],
]) {
test.describe(variant, () => {
// The engine is generated from a template string and runs in a Web Worker. Decode the
// template literal just as the browser does before extracting real production functions.
const marker = 'const WORKER_SOURCE = `';
const templateStart = script.indexOf(marker) + marker.length - 1;
const templateEnd = script.indexOf('\n`;\n', templateStart);
assert.ok(templateStart > marker.length - 2 && templateEnd > templateStart,
  'Modern worker template must be present');
const source = new Function('return ' + script.slice(templateStart, templateEnd + 2))();
test('complete worker source is valid JavaScript', () => {
  assert.doesNotThrow(() => new Script(source));
});
const start = source.indexOf('var SEQ_TAG =');
const end = source.indexOf('var LANE_HOT_MS =', start);
assert.ok(start >= 0 && end > start, 'Modern engine ledger must be present');

// Extract trusted production functions to test the real logic without Twitch network access.
const engine = new Function(source.slice(start, end) + '\nreturn { seqRead, parsePlaylist, newLedger, ledgerAbsorb, ledgerTail, newServeState, servePlaylist, ledgerPrune };')();

const content = (startSeq, count, { origin = 'main', ended = false, startTime = '2026-10-15T12:00:00.000Z' } = {}) => {
  const rows = [
    '#EXTM3U', '#EXT-X-VERSION:6', '#EXT-X-TARGETDURATION:2',
    '#EXT-X-MEDIA-SEQUENCE:498', '#EXT-X-TWITCH-LIVE-SEQUENCE:' + startSeq,
  ];
  for (let i = 0; i < count; i++) {
    if (i === 0) rows.push('#EXT-X-PROGRAM-DATE-TIME:' + startTime);
    rows.push('#EXTINF:2.000,live', 'https://media.example/' + origin + '/' + (startSeq + i) + '.ts');
  }
  if (ended) rows.push('#EXT-X-ENDLIST');
  return rows.join('\n');
};

test('live-sequence positioning is independent of media-sequence', () => {
  const m = engine.parsePlaylist(content(600, 3));
  assert.equal(m.ok, true);
  assert.deepEqual(m.items.map((x) => x.seq), [600, 601, 602]);
  assert.equal(engine.seqRead(content(600, 3)), 498);
  assert.equal(m.targetDur, 2);
});

test('ad discontinuity does not assign a live-sequence number to stitched media', () => {
  const m = engine.parsePlaylist([
    '#EXTM3U', '#EXT-X-TWITCH-LIVE-SEQUENCE:800',
    '#EXTINF:2,live', 'https://media.example/live800.ts',
    '#EXT-X-DISCONTINUITY', '#EXTINF:2,ad', 'https://media.example/stitched-ad.ts',
    '#EXT-X-TWITCH-LIVE-SEQUENCE:803', '#EXTINF:2,live', 'https://media.example/live803.ts',
  ].join('\n'));
  assert.deepEqual(m.items.map((x) => x.seq), [800, null, 803]);
});

test('backup media fills a stitched gap without repeating existing main segments', () => {
  const main = engine.parsePlaylist([
    '#EXTM3U', '#EXT-X-VERSION:6', '#EXT-X-TARGETDURATION:2',
    '#EXT-X-TWITCH-LIVE-SEQUENCE:100', '#EXT-X-PROGRAM-DATE-TIME:2026-10-15T12:00:00.000Z',
    '#EXTINF:2,live', 'https://media.example/main/100.ts',
    '#EXT-X-DISCONTINUITY', '#EXTINF:2,ad', 'https://media.example/main/ad.ts',
    '#EXT-X-TWITCH-LIVE-SEQUENCE:102',
    '#EXTINF:2,live', 'https://media.example/main/102.ts',
  ].join('\n'));
  const backup = engine.parsePlaylist(content(100, 3, { origin: 'backup' }));
  const ledger = engine.newLedger();
  engine.ledgerAbsorb(ledger, main, 'main');
  engine.ledgerAbsorb(ledger, backup, 'backup');
  const result = engine.servePlaylist(ledger, engine.newServeState(), 'main');
  assert.ok(result && result.text);
  assert.equal(result.from, 100);
  assert.equal(result.to, 102);
  assert.match(result.text, /main\/100\.ts/);
  assert.match(result.text, /backup\/101\.ts/);
  assert.match(result.text, /main\/102\.ts/);
  assert.ok(!result.text.includes('main/ad.ts'));
  assert.equal((result.text.match(/#EXTINF:/g) || []).length, 3);
});

test('served timeline stays nondecreasing across playlist refreshes', () => {
  const ledger = engine.newLedger(), state = engine.newServeState();
  engine.ledgerAbsorb(ledger, engine.parsePlaylist(content(200, 3)), 'main');
  const first = engine.servePlaylist(ledger, state, 'main');
  assert.ok(first);
  engine.ledgerAbsorb(ledger, engine.parsePlaylist(content(201, 4, {origin:'backup'})), 'backup');
  const second = engine.servePlaylist(ledger, state, 'backup');
  assert.ok(second);
  assert.ok(second.from >= first.from);
  assert.match(second.text, /main\/201\.ts/);
  assert.match(second.text, /backup\/204\.ts/);
  const timestamps = [...second.text.matchAll(/#EXT-X-PROGRAM-DATE-TIME:([^\n]+)/g)]
    .map((match) => Date.parse(match[1]));
  assert.ok(timestamps.every((t, i) => i === 0 || t > timestamps[i - 1]));
});

test('closed original stream preserves ENDLIST', () => {
  const ledger = engine.newLedger();
  engine.ledgerAbsorb(ledger, engine.parsePlaylist(content(900, 3, {ended:true})), 'main');
  const served = engine.servePlaylist(ledger, engine.newServeState(), 'main');
  assert.ok(served?.text.includes('#EXT-X-ENDLIST'));
});

test('empty and malformed playlists fail gracefully', () => {
  assert.equal(engine.parsePlaylist('not an HLS playlist').ok, false);
  assert.equal(engine.parsePlaylist(null).ok, false);
  assert.equal(engine.servePlaylist(engine.newLedger(), engine.newServeState(), 'main'), null);
});

test('prefetch sequence extends the window without duplicating media', () => {
  const m = engine.parsePlaylist(content(300, 2) + '\n#EXT-X-TWITCH-PREFETCH:https://media.example/302.ts');
  assert.deepEqual(m.items.map(x => [x.seq, x.hint]), [[300,false],[301,false],[302,true]]);
  const ledger = engine.newLedger();
  engine.ledgerAbsorb(ledger, m, 'main');
  const served = engine.servePlaylist(ledger, engine.newServeState(), 'main');
  assert.match(served.text, /#EXT-X-TWITCH-PREFETCH:https:\/\/media\.example\/302\.ts/);
});
});
}
