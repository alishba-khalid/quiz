import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center py-24 px-4 bg-canvas text-center">
      <div
        className="text-8xl font-medium text-hairline mb-6 leading-none select-none"
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
      >
        404
      </div>
      <h1 className="text-2xl font-semibold text-ink mb-3">Page not found</h1>
      <p className="text-muted mb-8 text-sm">This page doesn&apos;t exist or has been moved.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent-dark transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
