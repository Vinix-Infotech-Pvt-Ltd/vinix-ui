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
const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const banner = `/*! Vinix UI v${version} | (c) Vinix Infotech Pvt. Ltd. | MIT License */\n`;

const css = banner + order
    .map((f) => `/* ==== ${f} ==== */\n` + readFileSync(join(cssDir, f), 'utf8').trim())
    .join('\n\n');

// Inject the package version into the JS so VinixUI.version can never drift.
const js = readFileSync(join(root, 'src', 'js', 'vinix-ui.js'), 'utf8')
    .replace(/version:\s*'[^']*'/, `version: '${version}'`);

writeFileSync(join(dist, 'vinix-ui.css'), css + '\n');
writeFileSync(join(dist, 'vinix-ui.js'), js);

// Mirror the built files into docs/ so the GitHub Pages gallery (served from the
// docs/ folder as site root) can load them with same-folder relative paths.
const docs = join(root, 'docs');
writeFileSync(join(docs, 'vinix-ui.css'), css + '\n');
writeFileSync(join(docs, 'vinix-ui.js'), js);

console.log(`Vinix UI v${version} built -> dist/ + docs/ (vinix-ui.css ${css.length} bytes, vinix-ui.js)`);
