export type AppLocale = 'en' | 'ja';

export type LocalizedText = {
  en: string;
  ja: string;
};

export function pickLocalizedText(text: LocalizedText, locale: AppLocale) {
  return text[locale] || text.en;
}

