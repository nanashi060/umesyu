import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const imagesDir = path.join(root, 'assets/images');
const generatedDir = path.join(root, 'assets/generated');

const sourceSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#5A1838"/>
  <path d="M0 760C178 680 247 720 396 624C548 526 657 308 1024 246V1024H0V760Z" fill="#213E38" opacity="0.62"/>
  <path d="M-24 214C165 128 308 156 482 82C620 23 780 3 1048 46V0H0L-24 214Z" fill="#7B2346" opacity="0.78"/>
  <path d="M210 648C132 543 152 383 254 292C359 198 524 189 641 282C760 377 800 543 737 670C686 773 581 833 474 827C364 821 272 731 210 648Z" fill="#F7B142" opacity="0.18"/>
  <rect x="300" y="230" width="424" height="572" rx="92" fill="#F6B64B"/>
  <rect x="340" y="278" width="344" height="476" rx="66" fill="#8C3F3D" opacity="0.25"/>
  <path d="M330 514H694V690C694 725.346 665.346 754 630 754H394C358.654 754 330 725.346 330 690V514Z" fill="#D98730"/>
  <path d="M360 320C360 286.863 386.863 260 420 260H604C637.137 260 664 286.863 664 320V356H360V320Z" fill="#F6D7A7"/>
  <rect x="430" y="176" width="164" height="94" rx="28" fill="#E9C48B"/>
  <rect x="414" y="150" width="196" height="70" rx="32" fill="#F4D4A3"/>
  <path d="M386 338C386 313.699 405.699 294 430 294H454V728H430C405.699 728 386 708.301 386 684V338Z" fill="#FFF2D6" opacity="0.32"/>
  <circle cx="442" cy="602" r="64" fill="#91B957"/>
  <circle cx="568" cy="634" r="76" fill="#739941"/>
  <circle cx="603" cy="514" r="52" fill="#B5CE65"/>
  <path d="M592 456C573 418 594 383 631 371C640 408 626 438 592 456Z" fill="#7FA447"/>
  <path d="M518 470C546 416 594 384 652 374" stroke="#6E8D45" stroke-width="18" stroke-linecap="round"/>
  <rect x="462" y="448" width="58" height="58" rx="12" fill="#FFE3A7" opacity="0.9"/>
  <rect x="544" y="438" width="62" height="62" rx="13" fill="#FFE9BA" opacity="0.88"/>
  <rect x="438" y="512" width="50" height="50" rx="11" fill="#FFF0CA" opacity="0.8"/>
  <path d="M344 514C428 482 588 482 680 514" stroke="#F5C76E" stroke-width="22" stroke-linecap="round" opacity="0.74"/>
  <path d="M258 730C304 816 394 876 508 878C631 880 742 802 790 696" stroke="#F2D6A2" stroke-width="24" stroke-linecap="round" opacity="0.42"/>
</svg>`;

const foregroundSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="432" height="432" viewBox="0 0 432 432" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="129" y="83" width="174" height="244" rx="38" fill="#F6B64B"/>
  <rect x="146" y="104" width="140" height="204" rx="28" fill="#8C3F3D" opacity="0.25"/>
  <path d="M141 205H291V282C291 296.359 279.359 308 265 308H167C152.641 308 141 296.359 141 282V205Z" fill="#D98730"/>
  <path d="M154 122C154 108.745 164.745 98 178 98H254C267.255 98 278 108.745 278 122V137H154V122Z" fill="#F6D7A7"/>
  <rect x="183" y="59" width="66" height="41" rx="12" fill="#E9C48B"/>
  <rect x="176" y="48" width="80" height="31" rx="14" fill="#F4D4A3"/>
  <path d="M165 130C165 119.507 173.507 111 184 111H194V297H184C173.507 297 165 288.493 165 278V130Z" fill="#FFF2D6" opacity="0.35"/>
  <circle cx="187" cy="244" r="27" fill="#91B957"/>
  <circle cx="240" cy="258" r="32" fill="#739941"/>
  <circle cx="255" cy="207" r="22" fill="#B5CE65"/>
  <path d="M249 183C241 167 250 153 265 148C269 164 263 176 249 183Z" fill="#7FA447"/>
  <path d="M218 189C230 166 250 153 274 149" stroke="#6E8D45" stroke-width="8" stroke-linecap="round"/>
  <rect x="195" y="180" width="24" height="24" rx="5" fill="#FFE3A7" opacity="0.9"/>
  <rect x="229" y="176" width="26" height="26" rx="5" fill="#FFE9BA" opacity="0.88"/>
  <rect x="185" y="207" width="21" height="21" rx="5" fill="#FFF0CA" opacity="0.8"/>
</svg>`;

const monochromeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="432" height="432" viewBox="0 0 432 432" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M154 137V122C154 108.745 164.745 98 178 98H254C267.255 98 278 108.745 278 122V137" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round"/>
  <rect x="176" y="48" width="80" height="31" rx="14" fill="#FFFFFF"/>
  <rect x="129" y="83" width="174" height="244" rx="38" stroke="#FFFFFF" stroke-width="18"/>
  <path d="M141 205H291V282C291 296.359 279.359 308 265 308H167C152.641 308 141 296.359 141 282V205Z" fill="#FFFFFF"/>
  <circle cx="187" cy="244" r="27" fill="#5A1838"/>
  <circle cx="240" cy="258" r="32" fill="#5A1838"/>
  <circle cx="255" cy="207" r="22" fill="#5A1838"/>
  <path d="M218 189C230 166 250 153 274 149" stroke="#5A1838" stroke-width="8" stroke-linecap="round"/>
</svg>`;

async function renderPng(svg, output, size, background) {
  await sharp(Buffer.from(svg))
    .resize(size, size, { fit: 'contain' })
    .png(background ? { compressionLevel: 9 } : undefined)
    .toFile(path.join(root, output));
}

await mkdir(imagesDir, { recursive: true });
await mkdir(generatedDir, { recursive: true });
await writeFile(path.join(generatedDir, 'umeshu-icon-source.svg'), sourceSvg);
await writeFile(path.join(generatedDir, 'umeshu-icon-foreground.svg'), foregroundSvg);
await writeFile(path.join(generatedDir, 'umeshu-icon-monochrome.svg'), monochromeSvg);

await renderPng(sourceSvg, 'assets/images/icon.png', 1024);
await renderPng(sourceSvg, 'assets/images/splash-icon.png', 512);
await renderPng(sourceSvg, 'assets/images/favicon.png', 64);
await renderPng(foregroundSvg, 'assets/images/android-icon-foreground.png', 432);
await renderPng(monochromeSvg, 'assets/images/android-icon-monochrome.png', 432);
await sharp({
  create: {
    width: 432,
    height: 432,
    channels: 4,
    background: '#5A1838',
  },
})
  .png({ compressionLevel: 9 })
  .toFile(path.join(imagesDir, 'android-icon-background.png'));

console.log('Generated app icons in assets/images and SVG sources in assets/generated.');
