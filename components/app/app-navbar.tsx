"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useMeContext } from "@/lib/me-context";
import { initialsFor } from "@/lib/use-me";
import { cn } from "@/lib/utils";

const APP_NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/library", label: "Library" },
] as const;

export function AppNavbar() {
  const pathname = usePathname();
  const me = useMeContext();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <div className="flex items-center gap-10">
          {/* Brand goes back to the public landing page, not /home — same
              pattern as components/navbar.tsx's own logo. The app's own
              "Home" is reachable instead via the nav links below (visible
              inline from md up, inside the mobile menu below that). */}
          <Link href="/" className="text-xl font-semibold tracking-tight">
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

        <div className="flex items-center gap-4">
          {/* AppLayout only renders this navbar once useMe() resolves to an
              authenticated session, so `me` is never null here in practice. */}
          <div
            className="flex size-9 items-center justify-center rounded-full border border-border text-xs font-semibold"
            title={me?.email}
          >
            {me ? initialsFor(me) : ""}
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-foreground md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 pt-2 pb-6 md:hidden">
          {APP_NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2 py-3 text-base transition-colors hover:bg-accent",
                  active ? "font-medium text-primary" : "text-foreground/90 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md px-2 py-3 text-base text-foreground/90 transition-colors hover:bg-accent hover:text-foreground"
          >
            ← Back to the landing page
          </Link>
        </nav>
      )}
    </header>
  );
}
