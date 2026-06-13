import { describe, expect, it } from 'vitest';

import { tipSeeds } from './tips';

describe('tip seeds', () => {
  it('has bilingual content and unique ids', () => {
    const ids = new Set(tipSeeds.map((tip) => tip.id));
    expect(ids.size).toBe(tipSeeds.length);
    for (const tip of tipSeeds) {
      expect(tip.title.en).toBeTruthy();
      expect(tip.title.ja).toBeTruthy();
      expect(tip.body.en).toBeTruthy();
      expect(tip.body.ja).toBeTruthy();
    }
  });
});

