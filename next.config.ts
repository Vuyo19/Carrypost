import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev-overlay indicator is position:fixed, so a full-page screenshot
  // (or Playwright run) captures it duplicated at every viewport-height
  // stitch. It also sits over content in the corner during normal dev.
  devIndicators: false,
};

export default nextConfig;
