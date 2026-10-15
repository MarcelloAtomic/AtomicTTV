import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import { readUblockScriptlet } from './lib/ublock-resource.mjs';

for (const file of [
  'atomicttv/atomicttv-ublock-origin.js',
  'vaft/vaft-ublock-origin.js',
  'video-swap-new/video-swap-new-ublock-origin.js',
]) {
  const source = readFileSync(file, 'utf8');
  const body = readUblockScriptlet(source);
  new Script('try {\n' + body + '\n} catch (error) {}', { filename: file });
  console.log('uBO-parsed syntax OK:', file);
}
