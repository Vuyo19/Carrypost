import { NEW_ADDRESS, UPDATE_ROWS } from "@/lib/app-data";
import { StatusPill } from "@/components/app/status-pill";

const inProgressCount = UPDATE_ROWS.filter(
  (row) => row.status !== "needs-you"
).length;

export function UpdatesList() {
  return (
    <div>
      <div className="flex flex-col gap-4 rounded-xl border border-primary/25 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold">{NEW_ADDRESS.line1}</p>
          <p className="text-sm text-muted-foreground">
            {NEW_ADDRESS.suburb}, {NEW_ADDRESS.city} · {NEW_ADDRESS.postalCode}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center self-start rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground sm:self-auto">
          {inProgressCount} in progress
        </span>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="pb-3 font-normal">Provider</th>
              <th className="pb-3 font-normal">Method</th>
              <th className="pb-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {UPDATE_ROWS.map((row) => (
              <tr key={row.provider} className="border-b border-border">
                <td className="py-4 font-medium">{row.provider}</td>
                <td className="py-4 text-muted-foreground">{row.method}</td>
                <td className="py-4">
                  <StatusPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
