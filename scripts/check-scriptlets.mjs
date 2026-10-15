import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

for (const file of [
  'vaft/vaft-ublock-origin.js',
  'video-swap-new/video-swap-new-ublock-origin.js',
]) {
  const source = readFileSync(file, 'utf8');
  const [header, ...body] = source.split('\n');
  assert.match(header, /^twitch-videoad\.js text\/javascript\s*$/);
  execFileSync(process.execPath, ['--check', '-'], {
    input: body.join('\n'),
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  console.log('Syntax OK:', file);
}
