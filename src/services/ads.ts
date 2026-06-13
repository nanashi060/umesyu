import { environment } from './environment';

export function shouldShowAds(purchaseEntitlementActive: boolean, internalScreen = false) {
  if (environment.disableAds || environment.isScreenshotMode || internalScreen || purchaseEntitlementActive) {
    return false;
  }

  return Boolean(environment.admobBannerUnitId);
}

