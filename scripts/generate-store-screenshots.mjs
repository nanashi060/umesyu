import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outputRoot = path.join(root, 'metadata/screenshots/ios');
const width = 1284;
const height = 2778;

const locales = {
  ja: [
    {
      file: '01-home.png',
      title: ['仕込みから熟成まで', 'ひと目で管理'],
      screenTitle: '今年の梅酒',
      subtitle: '梅仕事の記録と次の確認日',
      primary: '2026年の仕込み',
      metricA: '熟成 92日目',
      metricB: '次の味見 7日後',
      rows: ['南高梅 1.0kg', '氷砂糖 700g', 'ホワイトリカー 1.8L'],
      tab: 'ホーム',
    },
    {
      file: '02-batches.png',
      title: ['味見と瓶詰めを', '忘れずリマインド'],
      screenTitle: '仕込み記録',
      subtitle: '瓶ごとの状態をローカル保存',
      primary: '南高梅 2026',
      metricA: '味見予定',
      metricB: '6月21日',
      rows: ['青梅の香りが強い', '3か月目に味見', '瓶詰め候補 12月'],
      tab: '記録',
    },
    {
      file: '03-tips.png',
      title: ['梅酒づくりの基本を', 'いつでも確認'],
      screenTitle: 'ティップス',
      subtitle: '保存瓶、氷砂糖、熟成のコツ',
      primary: '保存瓶は清潔に',
      metricA: '基本',
      metricB: '5件',
      rows: ['瓶はしっかり乾かす', '冷暗所でゆっくり熟成', '味見メモを残す'],
      tab: 'ティップス',
    },
  ],
  'en-US': [
    {
      file: '01-home.png',
      title: ['Track batches', 'from prep to aging'],
      screenTitle: 'This Year',
      subtitle: 'Batch notes and next check date',
      primary: '2026 Umeshu',
      metricA: 'Aging day 92',
      metricB: 'Taste in 7 days',
      rows: ['Japanese plum 1.0kg', 'Rock sugar 700g', 'White liquor 1.8L'],
      tab: 'Home',
    },
    {
      file: '02-batches.png',
      title: ['Remember tasting', 'and bottling dates'],
      screenTitle: 'Batches',
      subtitle: 'Local records for each jar',
      primary: 'Nanko Plum 2026',
      metricA: 'Next tasting',
      metricB: 'Jun 21',
      rows: ['Fresh plum aroma', 'Taste at 3 months', 'Bottle around December'],
      tab: 'Batches',
    },
    {
      file: '03-tips.png',
      title: ['Keep umeshu basics', 'close at hand'],
      screenTitle: 'Tips',
      subtitle: 'Jars, sugar, aging, and storage',
      primary: 'Keep jars clean',
      metricA: 'Basics',
      metricB: '5 tips',
      rows: ['Dry the jar completely', 'Age in a cool dark place', 'Keep tasting notes'],
      tab: 'Tips',
    },
  ],
};

function textLines(lines, x, y, size, color, weight = 700, gap = 74, anchor = 'middle') {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * gap}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`,
    )
    .join('');
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function phoneUi(item) {
  return `
    <rect x="162" y="656" width="960" height="1868" rx="96" fill="#1F171D"/>
    <rect x="198" y="696" width="888" height="1788" rx="70" fill="#FCF8F0"/>
    <rect x="522" y="726" width="240" height="28" rx="14" fill="#1F171D" opacity="0.82"/>
    <text x="270" y="858" font-size="42" font-weight="700" fill="#4B2231">${escapeXml(item.screenTitle)}</text>
    <text x="270" y="914" font-size="28" font-weight="500" fill="#876D58">${escapeXml(item.subtitle)}</text>
    <rect x="270" y="988" width="744" height="338" rx="34" fill="#5A1838"/>
    <circle cx="850" cy="1098" r="118" fill="#F0A83A" opacity="0.95"/>
    <circle cx="906" cy="1168" r="76" fill="#86A94C"/>
    <text x="318" y="1082" font-size="48" font-weight="800" fill="#FFF7E6">${escapeXml(item.primary)}</text>
    <text x="318" y="1150" font-size="30" font-weight="600" fill="#F4D6A1">${escapeXml(item.metricA)}</text>
    <text x="318" y="1210" font-size="34" font-weight="700" fill="#FFFFFF">${escapeXml(item.metricB)}</text>
    <rect x="270" y="1384" width="352" height="182" rx="28" fill="#FFFFFF"/>
    <rect x="662" y="1384" width="352" height="182" rx="28" fill="#FFFFFF"/>
    <text x="314" y="1462" font-size="28" font-weight="700" fill="#5A1838">${escapeXml(item.metricA)}</text>
    <text x="314" y="1514" font-size="34" font-weight="800" fill="#2F362D">${escapeXml(item.metricB)}</text>
    <text x="706" y="1462" font-size="28" font-weight="700" fill="#5A1838">${escapeXml(item.tab)}</text>
    <text x="706" y="1514" font-size="34" font-weight="800" fill="#2F362D">Local-first</text>
    ${item.rows
      .map(
        (row, index) => `
          <rect x="270" y="${1642 + index * 150}" width="744" height="112" rx="26" fill="#FFFFFF"/>
          <circle cx="326" cy="${1698 + index * 150}" r="18" fill="${index === 0 ? '#86A94C' : index === 1 ? '#F0A83A' : '#5A1838'}"/>
          <text x="370" y="${1710 + index * 150}" font-size="32" font-weight="650" fill="#392D2A">${escapeXml(row)}</text>
        `,
      )
      .join('')}
    <rect x="270" y="2248" width="744" height="96" rx="48" fill="#5A1838"/>
    <text x="642" y="2310" text-anchor="middle" font-size="32" font-weight="800" fill="#FFFFFF">${escapeXml(item.tab)}</text>
  `;
}

function screenshotSvg(item) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#F8F1E7"/>
  <path d="M0 0H1284V780C1050 686 835 662 642 712C421 770 250 894 0 870V0Z" fill="#5A1838"/>
  <path d="M0 2240C214 2142 388 2158 618 2238C826 2311 1038 2355 1284 2266V2778H0V2240Z" fill="#243E38" opacity="0.95"/>
  <circle cx="188" cy="432" r="150" fill="#F0A83A" opacity="0.32"/>
  <circle cx="1098" cy="592" r="112" fill="#86A94C" opacity="0.28"/>
  <g font-family="Hiragino Sans, Noto Sans CJK JP, Arial, sans-serif" letter-spacing="0">
    ${textLines(item.title, 642, 306, 76, '#FFF7E6', 800, 86)}
    <text x="642" y="502" text-anchor="middle" font-size="32" font-weight="600" fill="#F4D6A1">Umeshu Notes</text>
    ${phoneUi(item)}
  </g>
</svg>`;
}

async function renderSet(locale, items) {
  const outDir = path.join(outputRoot, locale, 'iphone-6.5');
  await mkdir(outDir, { recursive: true });
  for (const item of items) {
    await sharp(Buffer.from(screenshotSvg(item)))
      .resize(width, height)
      .flatten({ background: '#F8F1E7' })
      .png({ compressionLevel: 9 })
      .toFile(path.join(outDir, item.file));
  }
}

for (const [locale, items] of Object.entries(locales)) {
  await renderSet(locale, items);
}

await mkdir(path.join(root, 'metadata/screenshots/config'), { recursive: true });
await writeFile(
  path.join(root, 'metadata/screenshots/config/umeshu-mvp.json'),
  `${JSON.stringify(
    {
      ios: {
        deviceType: 'IPHONE_65',
        dimensions: { width, height },
        locales: Object.keys(locales),
        order: locales.ja.map((item) => item.file),
      },
    },
    null,
    2,
  )}\n`,
);

console.log('Generated App Store screenshots under metadata/screenshots/ios.');
