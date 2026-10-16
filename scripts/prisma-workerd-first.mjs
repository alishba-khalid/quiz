// Cloudflare build step, run right after `prisma generate`.
//
// The generated .prisma/client/package.json lists the "node" export condition before
// "workerd". OpenNext bundles for the node platform with the workerd condition added,
// so both are active and "node" wins, which picks the build that compiles WebAssembly
// at runtime — something Workers forbid. Moving "workerd" first selects edge.js, which
// imports the .wasm as a module. Node.js ignores the workerd condition, so local dev
// and Vercel builds resolve exactly as before.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const pkgPath = path.join(path.dirname(require.resolve("@prisma/client/package.json")), "../../.prisma/client/package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

function workerdFirst(value) {
  if (!value || typeof value !== "object") return value;
  const entries = Object.entries(value).map(([k, v]) => [k, workerdFirst(v)]);
  const workerd = entries.filter(([k]) => k === "workerd");
  return Object.fromEntries([...workerd, ...entries.filter(([k]) => k !== "workerd")]);
}

pkg.exports = workerdFirst(pkg.exports);
pkg.imports = workerdFirst(pkg.imports);
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("Prisma client: workerd export condition moved first");
