import { Linking } from 'react-native';

import { buildAmazonSearchUrl, buildUmeshuSupplyQuery } from '@/domain/amazon';

import { environment } from './environment';

export async function openUmeshuSupplySearch(parts: string[]) {
  const query = buildUmeshuSupplyQuery(parts);
  const url = buildAmazonSearchUrl(query, environment.amazonAssociateTag, 'jp');
  if (!url) {
    return { opened: false, reason: 'empty_query' as const };
  }

  await Linking.openURL(url);
  return { opened: true, url };
}

