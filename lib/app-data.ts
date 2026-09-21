/**
 * Static mock data for the product screens behind auth.
 *
 * The v2/v3 concept decks are illustrative — "Illustrative price for this
 * UI concept" appears on the payment step itself — so there is no backend
 * yet. These are the same numbers and accounts shown in the decks, kept in
 * one place so the wizard steps, the home dashboard and /updates all agree.
 */

export type AccountStatus = "ready" | "needs-you";
export type UpdateStatus = "updated" | "in-progress" | "needs-you";

export type Account = {
  id: string;
  name: string;
  category: string;
  status: AccountStatus;
};

export const CURRENT_ADDRESS = {
  line1: "15 Oxford Road",
  area: "Rosebank, Johannesburg",
  postalCode: "2196",
};

export const NEW_ADDRESS = {
  line1: "24 Melrose Boulevard",
  suburb: "Melrose",
  city: "Johannesburg",
  postalCode: "2196",
  effectiveFrom: "15 September 2026",
};

/** What Carrypost can carry a change to — the Address step's dropdown.
 *  Backend support for all three now exists (CarrypostBackend's
 *  AddressChange.change_type); discovery itself doesn't depend on which
 *  one is picked — "who has this person's details on file" is the same
 *  question regardless of what's changing about them. */
export const CHANGE_TYPES = [
  { id: "address", label: "Address" },
  { id: "phone_number", label: "Phone number" },
  { id: "surname", label: "Surname" },
] as const;

export type ChangeType = (typeof CHANGE_TYPES)[number]["id"];

/** Shared copy fragments keyed by change type — one source so the
 *  Accounts heading, Pay step, and anywhere else that mentions "your new
 *  X" can't drift out of sync with each other. */
export const NEW_VALUE_NOUNS: Record<ChangeType, string> = {
  address: "new address",
  phone_number: "new phone number",
  surname: "new surname",
};

export const CHANGE_TYPE_UPDATE_LABELS: Record<ChangeType, string> = {
  address: "Address update",
  phone_number: "Phone number update",
  surname: "Surname update",
};

export const CURRENT_PHONE_NUMBER = "071 555 0134";
export const NEW_PHONE_NUMBER = "082 918 4420";

export const CURRENT_SURNAME = "Mahlangu";
export const NEW_SURNAME = "Kakaza";

export const ACCOUNTS_FOUND: Account[] = [
  { id: "clicks", name: "Clicks", category: "Retail", status: "ready" },
  { id: "woolworths", name: "Woolworths", category: "Retail", status: "ready" },
  { id: "afrihost", name: "Afrihost", category: "Internet", status: "ready" },
  { id: "virgin-active", name: "Virgin Active", category: "Gym", status: "ready" },
  { id: "discovery", name: "Discovery", category: "Medical scheme", status: "needs-you" },
  { id: "mtn", name: "MTN", category: "Mobile", status: "ready" },
  { id: "standard-bank", name: "Standard Bank", category: "Bank", status: "needs-you" },
  { id: "sars", name: "SARS", category: "Government", status: "needs-you" },
];

/** Pre-selected on entering the Accounts step, mirroring the deck: every
 *  "Ready" account plus one guided one (Discovery), the other two guided
 *  accounts left for the customer to opt into. */
export const DEFAULT_SELECTED_ACCOUNT_IDS = [
  "clicks",
  "woolworths",
  "afrihost",
  "virgin-active",
  "discovery",
  "mtn",
];

/**
 * The providers Carrypost is allowlisted to dispatch and update — the
 * "10–20 South African providers" the concept brief scopes the MVP to.
 * Offered as the alternative to Gmail discovery on the Connect step: a
 * customer who doesn't want to grant inbox access picks straight from this
 * catalog instead. Banks, the medical scheme and SARS stay "needs-you"
 * regardless of how the account was added — that reflects FICA/KYC and
 * verification requirements on the provider's side (see the Concept
 * Brief's Limitations section), not anything about the discovery method.
 */
export const SUPPORTED_PROVIDERS: Account[] = [
  { id: "clicks", name: "Clicks", category: "Retail", status: "ready" },
  { id: "woolworths", name: "Woolworths", category: "Retail", status: "ready" },
  { id: "pick-n-pay", name: "Pick n Pay", category: "Retail", status: "ready" },
  { id: "afrihost", name: "Afrihost", category: "Internet", status: "ready" },
  { id: "webafrica", name: "Webafrica", category: "Internet", status: "ready" },
  { id: "virgin-active", name: "Virgin Active", category: "Gym", status: "ready" },
  { id: "planet-fitness", name: "Planet Fitness", category: "Gym", status: "ready" },
  { id: "mtn", name: "MTN", category: "Mobile", status: "ready" },
  { id: "vodacom", name: "Vodacom", category: "Mobile", status: "ready" },
  { id: "telkom", name: "Telkom", category: "Mobile", status: "ready" },
  { id: "outsurance", name: "OUTsurance", category: "Insurance", status: "ready" },
  { id: "discovery", name: "Discovery", category: "Medical scheme", status: "needs-you" },
  { id: "standard-bank", name: "Standard Bank", category: "Bank", status: "needs-you" },
  { id: "absa", name: "Absa", category: "Bank", status: "needs-you" },
  { id: "sars", name: "SARS", category: "Government", status: "needs-you" },
];

export const PRICE = {
  amount: 149,
  currency: "R",
};

export type UpdateRow = {
  provider: string;
  method: string;
  status: UpdateStatus;
};

export const UPDATE_ROWS: UpdateRow[] = [
  { provider: "Clicks", method: "Email request", status: "updated" },
  { provider: "Woolworths", method: "Customer service", status: "updated" },
  { provider: "Afrihost", method: "Portal / support", status: "in-progress" },
  { provider: "MTN", method: "API / support", status: "in-progress" },
  { provider: "Discovery", method: "Guided verification", status: "needs-you" },
  { provider: "Standard Bank", method: "Guided verification", status: "needs-you" },
];

/** Same copy shown twice: in the Connect step's own "Requested access"
 *  list, and in the mock Google consent screen it opens — kept in one
 *  place so the two never drift apart. */
export const REQUESTED_SCOPES = [
  "Read-only access to identify providers",
  "View sender and account-related emails",
  "Send emails to providers on your behalf",
];

export const WIZARD_STEPS = [
  { number: 1, label: "Connect" },
  { number: 2, label: "Address" },
  { number: 3, label: "Accounts" },
  { number: 4, label: "Documents" },
  { number: 5, label: "Pay" },
  { number: 6, label: "Done" },
] as const;
