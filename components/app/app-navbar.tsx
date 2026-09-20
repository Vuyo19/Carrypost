"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMeContext } from "@/lib/me-context";
import { initialsFor } from "@/lib/use-me";
import { cn } from "@/lib/utils";

const APP_NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/change-address", label: "Change address" },
  { href: "/updates", label: "Updates" },
] as const;

export function AppNavbar() {
  const pathname = usePathname();
  const me = useMeContext();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <div className="flex items-center gap-10">
          <Link href="/home" className="text-xl font-semibold tracking-tight">
            Carrypost.
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {APP_NAV_LINKS.map((link) => {
              const active = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors",
                    active
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* AppLayout only renders this navbar once useMe() resolves to an
            authenticated session, so `me` is never null here in practice. */}
        <div
          className="flex size-9 items-center justify-center rounded-full border border-border text-xs font-semibold"
          title={me?.email}
        >
          {me ? initialsFor(me) : ""}
        </div>
      </div>
    </header>
  );
}
