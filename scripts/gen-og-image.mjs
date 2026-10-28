import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(root, 'public', 'og-image.png');

const fontCandidates = [
  'C:\\Windows\\Fonts\\seguisb.ttf',
  'C:\\Windows\\Fonts\\arialbd.ttf',
  'C:\\Windows\\Fonts\\segoeuib.ttf',
  'C:\\Windows\\Fonts\\Inter-Bold.ttf',
];

let fontFace = '';
const fontFile = fontCandidates.find((f) => existsSync(f));
if (fontFile) {
  const b64 = readFileSync(fontFile).toString('base64');
  fontFace = `@font-face {
  font-family: 'FxBrand';
  font-style: normal;
  font-weight: 700;
  src: url(data:font/ttf;base64,${b64}) format('truetype');
}
`;
  console.log(`embedding font: ${fontFile}`);
} else {
  console.warn('no bold font found on system; falling back to generic sans-serif');
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>${fontFace}</style>
    <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E8CC"/>
      <stop offset="100%" stop-color="#9B30FF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#brand)"/>
  <g opacity="0.18">
    <circle cx="240" cy="120" r="260" fill="#08080A"/>
    <circle cx="1000" cy="560" r="320" fill="#08080A"/>
  </g>
  <g opacity="0.25">
    <ellipse cx="600" cy="645" rx="560" ry="150" fill="#FFFFFF"/>
  </g>
  <rect x="60" y="60" width="1080" height="510" rx="36" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="2"/>

  <g text-anchor="middle">
    <rect x="472" y="168" width="256" height="56" rx="28" fill="#08080A" fill-opacity="0.55"/>
    <text x="600" y="206" font-family="FxBrand, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="4" fill="#FFFFFF">AI-POWERED AUDIO PRODUCTION</text>

    <text x="600" y="352" font-family="FxBrand, Arial, sans-serif" font-size="152" font-weight="700" fill="#FFFFFF">FxTune</text>

    <text x="600" y="416" font-family="FxBrand, Arial, sans-serif" font-size="34" font-weight="700" fill="#FFFFFF" fill-opacity="0.92">Platinum Studio Audio Production</text>
    <text x="600" y="462" font-family="FxBrand, Arial, sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" fill-opacity="0.78">AI mastering · real-time DSP · collaborative cloud sync</text>

    <text x="600" y="534" font-family="FxBrand, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="2" fill="#FFFFFF" fill-opacity="0.85">fxtune.app</text>
  </g>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(outFile);
console.log(`wrote ${outFile} (1200x630)`);