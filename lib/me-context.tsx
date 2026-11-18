"use client";

import { createContext, useContext } from "react";

import type { Me } from "@/lib/use-me";

/**
 * Set once by the (app) layout's single useMe() call — components below it
 * (AppNavbar and friends) read from here instead of each firing their own
 * request to GET /auth/me.
 */
const MeContext = createContext<Me | null>(null);

export const MeProvider = MeContext.Provider;

export function useMeContext(): Me | null {
  return useContext(MeContext);
}
