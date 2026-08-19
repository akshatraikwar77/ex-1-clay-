/*
 * FLUX HOST — post-build path fixer
 * Rewrites absolute "/img/..." asset paths to relative "./img/..."
 * so the site works on ANY host: InfinityFree, GitHub Pages (subfolder),
 * Vercel, Netlify, a domain subfolder — anywhere.
 *
 * Run AFTER building:   npm run build && node fix-paths.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const file = new URL("./dist/index.html", import.meta.url);
let html = readFileSync(file, "utf8");

const before = (html.match(/\/img\//g) || []).length;
html = html.replaceAll('"/img/', '"./img/').replaceAll("src='/img/", "src='./img/");

writeFileSync(file, html);
console.log(`✓ Rewrote ${before} asset path(s) to relative (./img/...) in dist/index.html`);
