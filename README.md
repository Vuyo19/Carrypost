# Carrypost

Carrypost is a home for short fiction — longer than an article, shorter than a book, written to be read in one sitting, right in your browser. No downloads, no apps. The shelf currently leans into South African comedy and satire, with new stories added regularly for Carrypost Ultra members.

## Demo & recordings

A walkthrough of the landing page (`Carrypost_LandingPage.mov`), along with screen recordings of 2 glitches found while building and testing this — including the RevenueCat offering bug described below — are in this Google Drive folder:

**[Carrypost demo & recordings](https://drive.google.com/drive/folders/1GHoJtCNvjH0_YlQ8lXQ5fU55im_77FLn?usp=sharing)**

## How it uses RevenueCat

The web app integrates RevenueCat's **Web Billing SDK** (`@revenuecat/purchases-js`), with entitlement checks reading from real `CustomerInfo` rather than any app-side assumption about who's paid, and RevenueCat's own hosted paywall rendering handling the checkout UI entirely. A live 3-variant RevenueCat Experiment drives which paywall design a given customer sees.

### Paywall Load Balancer

On top of that sits a custom client-side weighted traffic splitter, modeled on an AWS Application Load Balancer's weighted target groups. RevenueCat's own Experiments enroll a percentage of customers into a test and then split *those* customers evenly across variants; this adds a dial on top of that, routing a configurable percentage of unlock attempts to each paywall design instead of an even split:

- Paywall A — 10%
- Paywall B — 60%
- Paywall C — 30%

Useful when you want to lean harder into a design you suspect is winning before the experiment's own results catch up. A session routed through this no longer contributes clean, single-variant-per-customer data back to the Experiment's own results, so it's for deliberate testing — not something that should run in front of real, unmodified traffic.

### What we found and fixed

Building this surfaced a real RevenueCat edge case worth sharing: a project can have Offerings with no paywall attached, and presenting a paywall for one of those hangs silently — no error, no rejection, just a stuck loading state. The fix was filtering to `hasPaywall === true` before resolving which offering to present, with a timeout left in place as a backstop against any other cause of the same symptom.

## Stack

Next.js 16, React 19, Tailwind v4, `@revenuecat/purchases-js`.
