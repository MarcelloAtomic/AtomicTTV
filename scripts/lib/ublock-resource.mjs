import assert from 'node:assert/strict';

// Read the single legacy JavaScript resource used by this repository. Unlike a
// JavaScript parser, uBO ends a resource at the first empty/whitespace-only line.
// Lines starting with '#', or '// ' at column zero, are resource comments.
// Format reference: gorhill/uBlock, src/js/redirect-engine.js, resourcesFromString.
// This intentionally does not implement other MIME types or resource metadata.
export function readUblockScriptlet(source) {
  const [header, ...lines] = source.replace(/\r\n/g, '\n').split('\n');
  assert.equal(header, 'twitch-videoad.js text/javascript');
  const body = [];
  for (const line of lines) {
    if (line.startsWith('#') || line.startsWith('// ')) continue;
    if (!/\S/.test(line)) break;
    assert.ok(!line.startsWith('/// '), 'Resource metadata is not supported here');
    body.push(line);
  }
  return body.join('\n');
}
