import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENT_ADDRESS, NEW_ADDRESS } from "@/lib/app-data";

export function AddressStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          Step 2
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          What changed?
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Enter your new address once. Carrypost will use it for the
          accounts you choose.
        </p>

        <form className="mt-10 flex max-w-md flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="line1">Address line 1</Label>
            <Input id="line1" defaultValue={NEW_ADDRESS.line1} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="suburb">Suburb</Label>
            <Input id="suburb" defaultValue={NEW_ADDRESS.suburb} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue={NEW_ADDRESS.city} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="postal">Postal code</Label>
              <Input id="postal" defaultValue={NEW_ADDRESS.postalCode} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="effective">Effective from</Label>
            <Input id="effective" defaultValue={NEW_ADDRESS.effectiveFrom} />
          </div>
        </form>
      </div>

      <div className="h-fit rounded-xl border border-primary/25 p-6">
        <p className="text-sm font-semibold text-primary">
          We found your current address in some accounts
        </p>

        <p className="mt-4 font-semibold">{CURRENT_ADDRESS.line1}</p>
        <p className="text-sm text-muted-foreground">
          {CURRENT_ADDRESS.area} · {CURRENT_ADDRESS.postalCode}
        </p>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-primary/30" aria-hidden="true" />
          <span className="text-[11px] font-semibold text-primary uppercase">
            change to
          </span>
          <span className="h-px flex-1 bg-primary/30" aria-hidden="true" />
        </div>

        <p className="font-semibold">{NEW_ADDRESS.line1}</p>
        <p className="text-sm text-muted-foreground">
          {NEW_ADDRESS.suburb}, {NEW_ADDRESS.city} · {NEW_ADDRESS.postalCode}
        </p>
      </div>

      <div className="lg:col-start-1">
        <Button onClick={onNext} className="h-11 rounded-full px-8">
          Continue
        </Button>
      </div>
    </div>
  );
}
