import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CHANGE_TYPE_UPDATE_LABELS,
  NEW_VALUE_NOUNS,
  PRICE,
  type ChangeType,
} from "@/lib/app-data";

export function PayStep({
  changeType,
  selectedCount,
  guidedCount,
  onNext,
}: {
  changeType: ChangeType;
  selectedCount: number;
  guidedCount: number;
  onNext: () => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
        Step 5
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Pay once. Get the admin moving.
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        One transaction for this change — no monthly subscription.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border p-6">
          <h2 className="font-semibold">Your change</h2>

          <div className="mt-4 flex items-center justify-between border-b border-border pb-4 text-sm">
            <span>{CHANGE_TYPE_UPDATE_LABELS[changeType]}</span>
            <span className="font-semibold">
              {PRICE.currency}
              {PRICE.amount}.00
            </span>
          </div>

          <dl className="flex flex-col gap-3 py-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Providers selected</dt>
              <dd>{selectedCount}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Guided providers</dt>
              <dd>{guidedCount}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Recurring subscription</dt>
              <dd className="font-medium text-primary">None</dd>
            </div>
          </dl>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="font-semibold">Total today</span>
            <span className="text-xl font-semibold text-primary">
              {PRICE.currency}
              {PRICE.amount}.00
            </span>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Illustrative price for this UI concept.
          </p>
        </div>

        <div className="rounded-xl border border-primary/25 p-6">
          <h2 className="font-semibold">Payment</h2>

          <div className="mt-5 flex flex-col gap-2">
            <Label htmlFor="card">Card number</Label>
            <Input id="card" defaultValue="4242 4242 4242 4242" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" placeholder="MM / YY" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>

          <label className="mt-5 flex items-center gap-2 text-sm">
            <Checkbox defaultChecked />I confirm these providers can receive
            my {NEW_VALUE_NOUNS[changeType]}
          </label>

          <Button onClick={onNext} className="mt-6 h-11 w-full rounded-full">
            Pay {PRICE.currency}
            {PRICE.amount} and start updates
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">
            Secure payment. One-off transaction.
          </p>
        </div>
      </div>
    </div>
  );
}
