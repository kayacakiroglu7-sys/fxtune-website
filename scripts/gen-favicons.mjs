import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const iconsDir = path.join(publicDir, 'icons');
mkdirSync(iconsDir, { recursive: true });

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="FxTune">
  <defs>
    <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E8CC"/>
      <stop offset="100%" stop-color="#9B30FF"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="#08080A"/>
  <rect x="48" y="48" width="416" height="416" rx="104" fill="url(#brand)"/>
  <g fill="none" stroke="#FFFFFF" stroke-width="76" stroke-linecap="round" stroke-linejoin="round">
    <path d="M196 136 H356"/>
    <path d="M196 136 V392"/>
    <path d="M196 258 H324"/>
  </g>
</svg>
`;

writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
console.log('wrote public/favicon.svg');

const svg = () => sharp(Buffer.from(faviconSvg)).png();

await svg()
  .resize(32, 32)
  .toFile(path.join(publicDir, 'favicon.png'));
console.log('wrote public/favicon.png (32x32)');

await svg()
  .resize(192, 192)
  .toFile(path.join(publicDir, 'favicon-192.png'));
console.log('wrote public/favicon-192.png (192x192)');

await svg()
  .resize(192, 192)
  .toFile(path.join(iconsDir, 'icon-192.png'));
console.log('wrote public/icons/icon-192.png (192x192)');

await svg()
  .resize(512, 512)
  .toFile(path.join(iconsDir, 'icon-512.png'));
console.log('wrote public/icons/icon-512.png (512x512)');