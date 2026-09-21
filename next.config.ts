import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `/api/*` -> CarrypostBackend, on this same origin.
   *
   * Carrypost's session is an httpOnly cookie set by the backend's OAuth
   * callback (see CarrypostBackend/app/core/security.py). A cookie set for
   * one origin is never sent to a different one — so if the frontend and
   * backend live on two different hosts (two separate tunnels, or even two
   * different *.trycloudflare.com subdomains, which Cloudflare's own public
   * suffix list treats as separate sites), the session silently can't
   * follow the browser between them. Proxying the backend underneath the
   * frontend's own origin keeps everything same-site, which is also what
   * makes CORS irrelevant here rather than merely configured around.
   *
   * Harmless locally: nothing points at `/api` unless NEXT_PUBLIC_API_URL
   * is set to a relative path (see .env.local).
   */
  async rewrites() {
    const target = process.env.API_PROXY_TARGET ?? "http://127.0.0.1:8000";
    return [{ source: "/api/:path*", destination: `${target}/api/:path*` }];
  },
  // The dev-overlay indicator is position:fixed, so a full-page screenshot
  // (or Playwright run) captures it duplicated at every viewport-height
  // stitch. It also sits over content in the corner during normal dev.
  devIndicators: false,
};

export default nextConfig;
