"use client";

/**
 * Configures the RevenueCat Web Billing SDK once, as early as possible,
 * and immediately warms its caches (see lib/revenuecat.ts's
 * warmRevenueCatCaches) so the first "Unlock with membership" tap isn't
 * also the first time offerings/pricing/branding get fetched. Rendered
 * in the root layout so it runs on every page — mirrors CarrypostMobile's
 * root _layout.tsx calling configureRevenueCat() in a top-level effect.
 * Renders nothing; it's pure side effect.
 */

import { useEffect } from "react";

import { getRevenueCat, warmRevenueCatCaches } from "@/lib/revenuecat";

export function RevenueCatInit() {
  useEffect(() => {
    const purchases = getRevenueCat();
    if (purchases) {
      warmRevenueCatCaches(purchases);
    }
  }, []);

  return null;
}
