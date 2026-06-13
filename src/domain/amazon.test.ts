import { describe, expect, it } from 'vitest';

import { buildAmazonSearchUrl, buildUmeshuSupplyQuery, sanitizeAmazonQuery } from './amazon';

describe('amazon search url', () => {
  it('sanitizes unsafe punctuation without removing Japanese text', () => {
    expect(sanitizeAmazonQuery('梅酒 保存瓶 <script>')).toBe('梅酒 保存瓶 script');
  });

  it('builds a tagged Amazon Japan search URL', () => {
    const url = buildAmazonSearchUrl('梅酒 保存瓶', 'example-22');
    expect(url).toBe('https://www.amazon.co.jp/s?k=%E6%A2%85%E9%85%92+%E4%BF%9D%E5%AD%98%E7%93%B6&tag=example-22');
  });

  it('builds a supply query without personal data assumptions', () => {
    expect(buildUmeshuSupplyQuery(['氷砂糖'])).toBe('梅酒 氷砂糖');
  });
});

