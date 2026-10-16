import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site is never meant to be embedded in another site's frame.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Left unbundled so Cloudflare's bundler can pick Prisma's workerd build.
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  outputFileTracingIncludes: {
    "/**": [
      "./node_modules/.prisma/client/edge.js",
      "./node_modules/.prisma/client/wasm-worker-loader.mjs",
      "./node_modules/.prisma/client/query_compiler_fast_bg.wasm",
      "./node_modules/@prisma/client/runtime/wasm-compiler-edge.js",
    ],
  },
  async redirects() {
    // www is the canonical host; the apex is also routed to this Worker on Cloudflare.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "quizkraft.tech" }],
        destination: "https://www.quizkraft.tech/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
