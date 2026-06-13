import { environment } from './environment';

export type PurchaseState =
  | { status: 'disabled' }
  | { status: 'unavailable'; reason: string }
  | { status: 'loading' }
  | { status: 'active'; entitlement: string }
  | { status: 'inactive' }
  | { status: 'cancelled' }
  | { status: 'error'; message: string };

export async function getPurchaseState(): Promise<PurchaseState> {
  if (environment.disablePaywall) {
    return { status: 'disabled' };
  }

  if (!environment.revenueCatApiKey) {
    return { status: 'unavailable', reason: 'RevenueCat API key is not configured.' };
  }

  return { status: 'unavailable', reason: 'RevenueCat native SDK setup is pending.' };
}

export async function restorePurchases(): Promise<PurchaseState> {
  return getPurchaseState();
}

