"use client";

/**
 * Whether the current RevenueCat customer holds the "Carrypost Ultra"
 * entitlement — mirrors CarrypostMobile's lib/use-membership.ts (hooks/
 * there; lib/ here, matching this repo's own use-me.ts convention).
 * Backed by RevenueCat's own CustomerInfo, independent of the (currently
 * mocked) sign-in flow in use-me.ts.
 *
 * The Web Billing SDK has no CustomerInfo update listener the way the
 * mobile SDKs do — there's nothing to subscribe to — so components call
 * `refresh()` by hand after a purchase resolves (see
 * components/app/locked-story-body.tsx) rather than this hook noticing
 * on its own.
 */

import { useCallback, useEffect, useState } from "react";

import { getRevenueCat, ULTRA_ENTITLEMENT_ID } from "@/lib/revenuecat";

export type MembershipState = {
  isMember: boolean;
  /** True until the first getCustomerInfo() call resolves. */
  loading: boolean;
  /** Link to manage the active subscription (Stripe/App Store/Play Store,
   *  whichever store it was bought through) — RevenueCat's own
   *  CustomerInfo.managementURL. `null` until there's an active
   *  subscription to manage. There's no dedicated web Customer Center UI
   *  from RevenueCat yet (unlike iOS/Android), so this link is the
   *  closest equivalent on this platform. */
  managementURL: string | null;
  refresh: () => Promise<void>;
};

export function useMembership(): MembershipState {
  const [isMember, setIsMember] = useState(false);
  const [managementURL, setManagementURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const purchases = getRevenueCat();
    if (!purchases) {
      // Not configured yet (no API key — see lib/revenuecat.ts). Not a
      // member, then, until that's fixed.
      setLoading(false);
      return;
    }

    try {
      const info = await purchases.getCustomerInfo();
      setIsMember(Boolean(info.entitlements.active[ULTRA_ENTITLEMENT_ID]));
      setManagementURL(info.managementURL);
    } catch (error) {
      console.warn("[membership] getCustomerInfo failed", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // `refresh` only ever calls setState after an `await`, never
    // synchronously during this effect — the lint rule's static analysis
    // can't see through that boundary and flags it anyway. Same
    // suppression as CarrypostMobile/src/hooks/use-membership.ts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return { isMember, managementURL, loading, refresh };
}
