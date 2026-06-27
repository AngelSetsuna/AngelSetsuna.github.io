import { readFile, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';

const ROOT = process.cwd();
const read = (p) => readFile(`${ROOT}/${p}`, 'utf8');
const dataUri = async (p) => {
  const buf = await readFile(`${ROOT}/${p}`);
  const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[extname(p).toLowerCase()] || 'application/octet-stream';
  return `data:${mime};base64,${buf.toString('base64')}`;
};

let html = await read('index.html');
const css = await read('assets/css/style.css');
const works = await read('assets/js/works.js');
const i18n = await read('assets/js/i18n.js');
const main = await read('assets/js/main.js');

const images = ['assets/avatar.png', 'works/01.jpg', 'works/02.jpg', 'works/03.jpg', 'works/04.jpg', 'works/05.jpg'];
const map = {};
for (const img of images) map[img] = await dataUri(img);

let worksInlined = works;
for (const [path, uri] of Object.entries(map)) {
  worksInlined = worksInlined.split(path).join(uri);
}

html = html.replace(/<link rel="stylesheet" href="assets\/css\/style\.css"\s*\/>/, `<style>\n${css}\n</style>`);
html = html.split('assets/avatar.png').join(map['assets/avatar.png']);
html = html.replace(/<script src="assets\/js\/works\.js"><\/script>\s*/, '');
html = html.replace(/<script src="assets\/js\/i18n\.js"><\/script>\s*/, '');
html = html.replace(
  /<script src="assets\/js\/main\.js"><\/script>/,
  `<script>\n${worksInlined}\n</script>\n  <script>\n${i18n}\n</script>\n  <script>\n${main}\n</script>`
);

await writeFile(`${ROOT}/site-standalone.html`, html, 'utf8');
const bytes = Buffer.byteLength(html, 'utf8');
console.log(`wrote site-standalone.html (${(bytes / 1024 / 1024).toFixed(2)} MB)`);
