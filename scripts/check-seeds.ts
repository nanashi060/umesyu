import { tipSeeds } from '../src/data/seeds/tips';

const allowedCategories = new Set(['prep', 'storage', 'troubleshooting', 'serving']);
const ids = new Set<string>();
const errors: string[] = [];

for (const tip of tipSeeds) {
  if (ids.has(tip.id)) {
    errors.push(`Duplicate tip id: ${tip.id}`);
  }
  ids.add(tip.id);

  if (!allowedCategories.has(tip.category)) {
    errors.push(`Unknown category for ${tip.id}: ${tip.category}`);
  }

  for (const field of ['title', 'body'] as const) {
    if (!tip[field].en.trim()) {
      errors.push(`Missing ${field}.en for ${tip.id}`);
    }
    if (!tip[field].ja.trim()) {
      errors.push(`Missing ${field}.ja for ${tip.id}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`seed check passed (${tipSeeds.length} tips)`);

