/**
 * RevenueCat Web Billing setup (@revenuecat/purchases-js) — the browser
 * counterpart to CarrypostMobile's lib/revenuecat.ts (react-native-purchases).
 * Same dashboard project, same "carrypost_pro" entitlement, different SDK:
 * the Web Billing SDK is browser-only (uses `window`/`document` directly),
 * so everything here must only ever run in a Client Component — never
 * during SSR or in a Server Component.
 *
 * Unlike the mobile SDKs, the Web SDK has no concept of an anonymous
 * device ID — `configure()` requires an explicit `appUserId`. Since real
 * accounts aren't wired up yet (sign-in is still mocked — see
 * lib/use-me.ts), `getOrCreateAnonymousAppUserId()` generates one in
 * RevenueCat's own anonymous-ID format and persists it in localStorage,
 * so the same browser keeps the same RevenueCat identity across visits
 * until real auth exists to call `identifyUser()` with instead.
 */

import { Purchases, type Offering, type Offerings } from "@revenuecat/purchases-js";

export const REVENUECAT_API_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY ?? "";

/** Gates "Carrypost Ultra" access — see .env.example. */
export const ULTRA_ENTITLEMENT_ID =
  process.env.NEXT_PUBLIC_REVENUECAT_ENTITLEMENT_ID || "carrypost_pro";

const ANONYMOUS_ID_STORAGE_KEY = "carrypost.rc_app_user_id";

function getOrCreateAnonymousAppUserId(): string {
  const existing = window.localStorage.getItem(ANONYMOUS_ID_STORAGE_KEY);
  if (existing) return existing;

  const generated = Purchases.generateRevenueCatAnonymousAppUserId();
  window.localStorage.setItem(ANONYMOUS_ID_STORAGE_KEY, generated);
  return generated;
}

/**
 * Configures the SDK and returns the shared instance — safe to call from
 * multiple components; only actually configures once (RevenueCat's own
 * `isConfigured()` guards it), and every later call just returns the
 * same instance via `getSharedInstance()`.
 *
 * Returns `null` when there's no API key yet (unset in .env.local) or
 * when called outside the browser (e.g. accidentally during SSR) —
 * callers should treat a `null` return as "not a member, nothing to do"
 * rather than throwing.
 */
export function getRevenueCat(): Purchases | null {
  if (typeof window === "undefined") return null;

  if (Purchases.isConfigured()) {
    return Purchases.getSharedInstance();
  }

  if (!REVENUECAT_API_KEY) {
    console.warn(
      "[revenuecat] NEXT_PUBLIC_REVENUECAT_API_KEY is not set (see .env.example) — " +
        "Purchases.configure() was skipped. Paywalls and entitlement checks will not work until it is."
    );
    return null;
  }

  return Purchases.configure({
    apiKey: REVENUECAT_API_KEY,
    appUserId: getOrCreateAnonymousAppUserId(),
  });
}

let cachedOfferings: Offerings | null = null;
let offeringsPromise: Promise<Offerings> | null = null;

/**
 * getOfferings(), but reused for the rest of this page load instead of
 * refetched on every "Unlock with membership" tap — the offerings and
 * their pricing don't change second-to-second, so refetching them fresh
 * on every click was pure wasted latency. Lives for the tab's lifetime;
 * a full reload starts the cache over.
 */
export function getOfferingsCached(purchases: Purchases): Promise<Offerings> {
  if (cachedOfferings) return Promise.resolve(cachedOfferings);

  if (!offeringsPromise) {
    offeringsPromise = purchases
      .getOfferings()
      .then((offerings) => {
        cachedOfferings = offerings;
        return offerings;
      })
      .catch((error) => {
        // Let the next call try again rather than being stuck on a
        // failed attempt for the rest of the session.
        offeringsPromise = null;
        throw error;
      });
  }
  return offeringsPromise;
}

/**
 * Warms branding info (RevenueCat's own `preload()`, intended exactly
 * for "speed up the first purchase/paywall call") and the offerings
 * cache above, right after configure() succeeds — so by the time
 * someone actually taps "Unlock with membership", most of what
 * `presentPaywall` would otherwise have to wait on is already in
 * memory. What's left at click time is mainly the specific paywall
 * design's own content (its workflow/background assets) — that can't
 * be pre-warmed the same way since which of the 3 it'll be isn't
 * decided until the weighted pick happens at click time (see
 * `pickWeightedOffering`).
 */
export function warmRevenueCatCaches(purchases: Purchases) {
  purchases.preload().catch((error) => console.warn("[revenuecat] preload() failed", error));
  getOfferingsCached(purchases).catch((error) =>
    console.warn("[revenuecat] getOfferings() warm-up failed", error)
  );
}

/**
 * Custom traffic split across the "3 Paywalls" Experiment's variants —
 * like weighted target groups on a load balancer, not RevenueCat's own
 * Experiments feature: the dashboard only controls what % of customers
 * are enrolled in the experiment at all, not what % of *those* land on
 * each variant (that's an even split there). Keyed by the Offering
 * identifier RevenueCat generated for each variant — check the
 * Experiment's "Variants setup" tab if these ever get renamed:
 *   - default_4   → Variant A — 10%
 *   - default_1   → Variant B — 60%
 *   - "Paywall B" → Variant C — 30% (the rest)
 * Weights don't need to sum to exactly 100 — they're normalized against
 * whichever of these are actually present below, so a renamed/removed
 * variant degrades gracefully instead of silently breaking.
 */
export const PAYWALL_VARIANT_WEIGHTS: Record<string, number> = {
  default_4: 10,
  default_1: 60,
  "Paywall B": 30,
};

/**
 * Rolls a weighted pick (see PAYWALL_VARIANT_WEIGHTS) out of every
 * Offering that actually HAS a paywall attached — a real user's session
 * that goes through this no longer contributes clean, single-variant-
 * per-customer data back to the Experiment's own results, so this is
 * for demoing/QA, not what should run in front of real traffic.
 *
 * Filtering on `hasPaywall` matters on its own, separately from the
 * weights: this project has 5 offerings, not 3 — the 3 real variants
 * above plus 2 legacy/leftover ones ("default", "default_2") with
 * nothing attached. Picking one of those was presentPaywall's actual
 * silent-hang bug all along — it lists the account's paywall workflows,
 * finds no match for an offering that has none, and never resolves or
 * rejects. The timeout in locked-story-body.tsx stays in as a backstop
 * for any *other* cause of that failure mode, not as the fix for this.
 *
 * Falls back to a plain uniform pick if none of the configured weights
 * match what's actually present (e.g. every variant got renamed), and
 * returns `null` only if there's no paywall-bearing offering at all —
 * callers should fall back to the default (omit `offering`) then.
 */
export function pickWeightedOffering(offerings: { all: Record<string, Offering> }): Offering | null {
  const candidates = Object.values(offerings.all).filter((o) => o.hasPaywall);
  if (candidates.length === 0) return null;

  const weighted = candidates.map((offering) => ({
    offering,
    weight: PAYWALL_VARIANT_WEIGHTS[offering.identifier] ?? 0,
  }));
  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);

  if (totalWeight <= 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  let roll = Math.random() * totalWeight;
  for (const { offering, weight } of weighted) {
    if (weight <= 0) continue;
    if (roll < weight) return offering;
    roll -= weight;
  }
  return weighted[weighted.length - 1].offering; // floating-point edge case
}
