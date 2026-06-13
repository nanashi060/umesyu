import { getLocales } from 'expo-localization';

import { resources, type AppLocale, type Resources } from './resources';

type DotPrefix<TPrefix extends string, TValue> = TValue extends string
  ? TPrefix
  : {
      [TKey in keyof TValue & string]: DotPrefix<`${TPrefix}.${TKey}`, TValue[TKey]>;
    }[keyof TValue & string];

export type TranslationKey = {
  [TKey in keyof Resources & string]: DotPrefix<TKey, Resources[TKey]>;
}[keyof Resources & string];

export function getDeviceLocale(): AppLocale {
  const languageCode = getLocales()[0]?.languageCode;
  return languageCode === 'ja' ? 'ja' : 'en';
}

export function translate(locale: AppLocale, key: TranslationKey, params?: Record<string, string | number>) {
  const value = key.split('.').reduce<unknown>((current, part) => {
    if (current && typeof current === 'object' && part in current) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, resources[locale]);

  const template = typeof value === 'string' ? value : key;

  if (!params) {
    return template;
  }

  return Object.entries(params).reduce(
    (text, [param, replacement]) => text.replaceAll(`{${param}}`, String(replacement)),
    template,
  );
}

