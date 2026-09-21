import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CHANGE_TYPES,
  CURRENT_ADDRESS,
  CURRENT_PHONE_NUMBER,
  CURRENT_SURNAME,
  NEW_ADDRESS,
  NEW_PHONE_NUMBER,
  NEW_SURNAME,
  type ChangeType,
} from "@/lib/app-data";

const COPY: Record<ChangeType, { description: string; found: string }> = {
  address: {
    description:
      "Enter your new address once. Carrypost will use it for the accounts you choose.",
    found: "We found your current address in some accounts",
  },
  phone_number: {
    description:
      "Enter your new phone number once. Carrypost will use it for the accounts you choose.",
    found: "We found your current phone number in some accounts",
  },
  surname: {
    description:
      "Enter your new surname once. Carrypost will use it for the accounts you choose.",
    found: "We found your current surname in some accounts",
  },
};

/**
 * The dropdown at the top decides which fields render below it and which
 * mock "before -> after" the side panel shows — same step, same position
 * in the wizard, three kinds of change. Discovery in Step 1 (Connect)
 * doesn't branch on this at all: which companies to notify is the same
 * question regardless of what's actually changing about the person (see
 * CarrypostBackend's app/services/discovery.py).
 */
export function AddressStep({
  changeType,
  onChangeTypeChange,
  onNext,
}: {
  changeType: ChangeType;
  onChangeTypeChange: (type: ChangeType) => void;
  onNext: () => void;
}) {
  const copy = COPY[changeType];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          Step 2
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          What changed?
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">{copy.description}</p>

        <div className="mt-8 flex max-w-md flex-col gap-2">
          <Label htmlFor="change-type">What do you want to update?</Label>
          <Select
            value={changeType}
            onValueChange={(value) => onChangeTypeChange(value as ChangeType)}
          >
            <SelectTrigger id="change-type" className="h-11 w-full">
              <SelectValue>
                {(value: ChangeType) =>
                  CHANGE_TYPES.find((type) => type.id === value)?.label ?? value
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {CHANGE_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <form className="mt-6 flex max-w-md flex-col gap-5">
          {changeType === "address" && (
            <>
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
            </>
          )}

          {changeType === "phone_number" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">New phone number</Label>
              <Input id="phone" type="tel" defaultValue={NEW_PHONE_NUMBER} />
            </div>
          )}

          {changeType === "surname" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="surname">New surname</Label>
              <Input id="surname" defaultValue={NEW_SURNAME} />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="effective">Effective from</Label>
            <Input id="effective" defaultValue={NEW_ADDRESS.effectiveFrom} />
          </div>
        </form>
      </div>

      <div className="h-fit rounded-xl border border-primary/25 p-6">
        <p className="text-sm font-semibold text-primary">{copy.found}</p>

        {changeType === "address" && (
          <>
            <p className="mt-4 font-semibold">{CURRENT_ADDRESS.line1}</p>
            <p className="text-sm text-muted-foreground">
              {CURRENT_ADDRESS.area} · {CURRENT_ADDRESS.postalCode}
            </p>
          </>
        )}
        {changeType === "phone_number" && (
          <p className="mt-4 font-semibold">{CURRENT_PHONE_NUMBER}</p>
        )}
        {changeType === "surname" && (
          <p className="mt-4 font-semibold">{CURRENT_SURNAME}</p>
        )}

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-primary/30" aria-hidden="true" />
          <span className="text-[11px] font-semibold text-primary uppercase">
            change to
          </span>
          <span className="h-px flex-1 bg-primary/30" aria-hidden="true" />
        </div>

        {changeType === "address" && (
          <>
            <p className="font-semibold">{NEW_ADDRESS.line1}</p>
            <p className="text-sm text-muted-foreground">
              {NEW_ADDRESS.suburb}, {NEW_ADDRESS.city} · {NEW_ADDRESS.postalCode}
            </p>
          </>
        )}
        {changeType === "phone_number" && (
          <p className="font-semibold">{NEW_PHONE_NUMBER}</p>
        )}
        {changeType === "surname" && <p className="font-semibold">{NEW_SURNAME}</p>}
      </div>

      <div className="lg:col-start-1">
        <Button onClick={onNext} className="h-11 rounded-full px-8">
          Continue
        </Button>
      </div>
    </div>
  );
}
