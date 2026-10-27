import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

// Run from the repository location, independently of the caller's directory.
const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
assert.equal(config.outputDirectory, 'dist', 'Vercel must serve the authored static website');
const output = path.resolve(root, config.outputDirectory);
const html = await readFile(path.join(output, 'index.html'), 'utf8');
assert.match(html, /<title>NOM[^<]*<\/title>/, 'The deployed homepage must be the NOM website');

const references = new Set();
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (!/^(?:[a-z]+:|\/\/|#)/i.test(match[1])) references.add(match[1].split(/[?#]/)[0]);
}
const app = await readFile(path.join(output, 'app.js'), 'utf8');
new Script(app, { filename: 'app.js' });
// Project photography is populated by the client-side gallery.
for (const match of app.matchAll(/image:\s*['"]([^'"]+)['"]/g)) {
  references.add(`assets/${match[1]}`);
}
for (const reference of references) {
  const target = path.resolve(output, reference);
  assert.ok(target.startsWith(output + path.sep), `Asset must stay in output directory: ${reference}`);
  const info = await stat(target);
  assert.ok(info.isFile() && info.size > 0, `Missing or empty deployed asset: ${reference}`);
}
console.log(`Deployment check passed: dist/index.html and ${references.size} local assets; JavaScript syntax valid.`);
