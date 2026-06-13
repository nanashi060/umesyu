export type AmazonMarket = 'jp' | 'us';

const MARKET_HOSTS: Record<AmazonMarket, string> = {
  jp: 'www.amazon.co.jp',
  us: 'www.amazon.com',
};

export function sanitizeAmazonQuery(query: string) {
  return query
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
}

export function buildAmazonSearchUrl(query: string, associateTag?: string, market: AmazonMarket = 'jp') {
  const safeQuery = sanitizeAmazonQuery(query);
  if (!safeQuery) {
    return null;
  }

  const url = new URL(`https://${MARKET_HOSTS[market]}/s`);
  url.searchParams.set('k', safeQuery);

  if (associateTag?.trim()) {
    url.searchParams.set('tag', associateTag.trim());
  }

  return url.toString();
}

export function buildUmeshuSupplyQuery(parts: string[]) {
  return sanitizeAmazonQuery(['梅酒', ...parts].filter(Boolean).join(' '));
}

