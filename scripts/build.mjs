/**
 * Vinix UI build — zero-dependency.
 * Inlines the CSS partials (in order) into dist/vinix-ui.css and copies the JS
 * to dist/vinix-ui.js. dist/ is committed so git-tag installs work without a
 * build step on the consumer side.
 *
 * Run:  node scripts/build.mjs   (or:  npm run build)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cssDir = join(root, 'src', 'css');
const dist = join(root, 'dist');
mkdirSync(dist, { recursive: true });

const order = ['tokens.css', 'base.css', 'components.css', 'layout.css'];
const banner = `/*! Vinix UI v${JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version} | (c) Vinix Infotech | proprietary */\n`;

const css = banner + order
    .map((f) => `/* ==== ${f} ==== */\n` + readFileSync(join(cssDir, f), 'utf8').trim())
    .join('\n\n');

writeFileSync(join(dist, 'vinix-ui.css'), css + '\n');
writeFileSync(join(dist, 'vinix-ui.js'), readFileSync(join(root, 'src', 'js', 'vinix-ui.js'), 'utf8'));

console.log('Vinix UI built -> dist/vinix-ui.css (' + css.length + ' bytes), dist/vinix-ui.js');
