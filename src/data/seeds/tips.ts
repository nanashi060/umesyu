import type { LocalizedText } from '../../domain/localized-text';
import type { TipCategoryCode } from '../../domain/umeshu';

export type TipSeed = {
  id: string;
  category: TipCategoryCode;
  title: LocalizedText;
  body: LocalizedText;
  sortOrder: number;
};

export const tipSeeds: TipSeed[] = [
  {
    id: 'wash-and-dry-plums',
    category: 'prep',
    sortOrder: 10,
    title: {
      en: 'Dry plums completely',
      ja: '梅はしっかり乾かす',
    },
    body: {
      en: 'After washing, remove stems and let the plums dry fully. Extra moisture makes the flavor cloudy and can invite spoilage.',
      ja: '洗った梅はヘタを取り、水気をしっかり切ります。余分な水分は風味をぼやけさせ、傷みの原因にもなります。',
    },
  },
  {
    id: 'sugar-layering',
    category: 'prep',
    sortOrder: 20,
    title: {
      en: 'Layer sugar between fruit',
      ja: '氷砂糖は層にする',
    },
    body: {
      en: 'Alternate plums and rock sugar so syrup forms evenly. Shake gently after the first week if sugar remains in one place.',
      ja: '梅と氷砂糖を交互に入れると、シロップが均一に出やすくなります。1週間後に偏りがあれば軽く揺らします。',
    },
  },
  {
    id: 'cool-dark-place',
    category: 'storage',
    sortOrder: 30,
    title: {
      en: 'Keep it cool and dark',
      ja: '冷暗所で育てる',
    },
    body: {
      en: 'Store the jar away from heat and direct light. A stable, cool cupboard helps the aroma develop cleanly.',
      ja: '直射日光と高温を避け、温度変化の少ない冷暗所に置きます。香りがきれいに育ちます。',
    },
  },
  {
    id: 'check-cloudiness',
    category: 'troubleshooting',
    sortOrder: 40,
    title: {
      en: 'Watch for unusual cloudiness',
      ja: '強い濁りを確認する',
    },
    body: {
      en: 'A little haze can be normal, but fuzzy growth, sour smells, or pressure buildup are warning signs. When in doubt, do not taste it.',
      ja: '多少の濁りは自然なことがありますが、カビ状のもの、強い酸臭、ガスの膨張は注意です。不安な場合は口にしないでください。',
    },
  },
  {
    id: 'first-tasting',
    category: 'serving',
    sortOrder: 50,
    title: {
      en: 'Taste after three months',
      ja: '3か月後から味見',
    },
    body: {
      en: 'Three months is a good first tasting window. Six months tastes rounder, and one year brings deeper aroma.',
      ja: '3か月頃から味見できます。6か月でまろやかに、1年で香りに深みが出ます。',
    },
  },
];
