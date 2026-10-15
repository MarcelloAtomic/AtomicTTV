import assert from 'node:assert/strict';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const get = (file) => readFileSync(join(root, file), 'utf8');
const manifest = JSON.parse(get('manifest.json'));
const script = get('atomicttv/atomicttv.user.js');
const userscriptVersion = script.match(/^\/\/ @version\s+(\d+\.\d+\.\d+)$/m)?.[1];
assert.ok(userscriptVersion, 'Missing semver @version');
assert.equal(userscriptVersion, manifest.version, 'Userscript and extension versions must match');
assert.equal(manifest.manifest_version, 3);
assert.equal(manifest.content_scripts?.[0]?.world, 'MAIN');
assert.deepEqual(manifest.content_scripts?.[0]?.matches, ['https://*.twitch.tv/*']);

const distRoot = join(root, 'dist');
const extensionRoot = join(distRoot, 'AtomicTTV-Chromium-' + manifest.version);
rmSync(extensionRoot, { recursive: true, force: true });
mkdirSync(join(extensionRoot, 'atomicttv'), { recursive: true });
for (const path of ['manifest.json', 'atomicttv/atomicttv.user.js', 'LICENSE', 'THIRD_PARTY_NOTICES.md']) {
  mkdirSync(dirname(join(extensionRoot, path)), { recursive: true });
  cpSync(join(root, path), join(extensionRoot, path));
}
writeFileSync(join(distRoot, 'INSTALL.txt'), [
  'AtomicTTV ' + manifest.version + ' (Chromium MV3)',
  '1) Open chrome://extensions or edge://extensions',
  '2) Enable Developer mode.',
  '3) Choose Load unpacked and select the AtomicTTV-Chromium-' + manifest.version + ' folder.',
  '4) Do not run a second Twitch-specific userscript/extension concurrently.',
  '5) Read README.md and docs/INSTALL.md for supported usage and limitations.',
  'This package is experimental and has not been live-verified on Twitch.'
].join('\n') + '\n');
console.log('Built extension folder:', extensionRoot);
