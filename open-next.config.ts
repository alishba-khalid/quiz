import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site has no ISR, only pages prerendered at build time, so they can be served
// straight from the static assets instead of needing an R2 bucket.
const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

// `npm run cf:build` already ran `prisma generate` and patched the client
// (scripts/prisma-workerd-first.mjs); `npm run build` would regenerate it.
config.buildCommand = "npx next build";

export default config;
