import { en, ja } from '../src/i18n/resources';

function collectKeys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, nested]) => collectKeys(nested, prefix ? `${prefix}.${key}` : key));
}

const enKeys = collectKeys(en).sort();
const jaKeys = collectKeys(ja).sort();
const missingInJa = enKeys.filter((key) => !jaKeys.includes(key));
const extraInJa = jaKeys.filter((key) => !enKeys.includes(key));

if (missingInJa.length || extraInJa.length) {
  console.error('i18n shape mismatch');
  console.error({ missingInJa, extraInJa });
  process.exit(1);
}

console.log(`i18n check passed (${enKeys.length} keys)`);

