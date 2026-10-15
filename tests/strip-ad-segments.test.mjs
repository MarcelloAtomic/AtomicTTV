import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const variants = [
  'vaft/vaft.user.js',
  'vaft/vaft-ublock-origin.js',
];

function loadStripAdSegments(file) {
  const source = readFileSync(file, 'utf8');
  const start = source.indexOf('    function stripAdSegments(');
  const end = source.indexOf('\n    function getStreamUrlForResolution(', start);
  assert.ok(start >= 0 && end > start, 'VAFT stripAdSegments section must exist');
  const cache = new Map();
  // Execute only this pure-ish production function with controlled globals, no Twitch I/O.
  const factory = new Function(
    'AdSignifier', 'AdSegmentCache', 'AllSegmentsAreAdSegments',
    source.slice(start, end) + '\nreturn stripAdSegments;'
  );
  return { strip: factory('stitched', cache, false), cache };
}

for (const file of variants) {
  test(file + ': tracking URLs are neutralized and output is updated', () => {
    const { strip, cache } = loadStripAdSegments(file);
    const input = [
      '#EXTM3U',
      '#EXT-X-DATERANGE:ID="stitched-123",X-TV-TWITCH-AD-URL="https://ads.example/view",X-TV-TWITCH-AD-CLICK-TRACKING-URL="https://ads.example/click"',
      '#EXTINF:2.0,ad',
      'https://media.example/ad.ts',
      '#EXT-X-TWITCH-PREFETCH:https://media.example/prefetch.ts',
    ].join('\n');
    const stream = { NumStrippedAdSegments: 0 };
    const output = strip(input, false, stream);
    assert.match(output, /X-TV-TWITCH-AD-URL="https:\/\/twitch\.tv"/);
    assert.match(output, /X-TV-TWITCH-AD-CLICK-TRACKING-URL="https:\/\/twitch\.tv"/);
    assert.ok(!output.includes('ads.example'));
    assert.ok(!output.includes('#EXT-X-TWITCH-PREFETCH:'));
    assert.equal(stream.NumStrippedAdSegments, 1);
    assert.equal(stream.IsStrippingAdSegments, true);
    assert.ok(cache.has('https://media.example/ad.ts'));
  });

  test(file + ': ordinary live media passes through unchanged', () => {
    const { strip, cache } = loadStripAdSegments(file);
    const input = '#EXTM3U\n#EXTINF:2.0,live\nhttps://media.example/live.ts';
    const stream = { NumStrippedAdSegments: 9 };
    assert.equal(strip(input, false, stream), input);
    assert.equal(stream.NumStrippedAdSegments, 0);
    assert.equal(stream.IsStrippingAdSegments, false);
    assert.equal(cache.size, 0);
  });

  test(file + ': a repeated ad segment is counted only once', () => {
    const { strip } = loadStripAdSegments(file);
    const input = '#EXTM3U\n#EXTINF:2.0,ad\nhttps://media.example/ad.ts';
    const stream = { NumStrippedAdSegments: 0 };
    strip(input, false, stream);
    strip(input, false, stream);
    assert.equal(stream.NumStrippedAdSegments, 1);
  });
}
