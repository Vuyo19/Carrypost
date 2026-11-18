"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/site-data";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Carrypost.
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-foreground/90 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            render={<Link href="/sign-up" />}
            nativeButton={false}
            variant="outline"
            className="rounded-full border-white/70 bg-transparent px-5 text-base text-foreground hover:bg-white hover:text-primary-foreground"
          >
            Start reading
          </Button>
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

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 pt-2 pb-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 text-base text-foreground/90 transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/sign-up"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border border-white/70 px-4 py-3 text-center text-base font-medium text-foreground"
          >
            Start reading
          </Link>
        </nav>
      )}
    </header>
  );
}
