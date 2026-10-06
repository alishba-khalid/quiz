"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center py-24 px-4 bg-canvas text-center">
      <h1 className="text-2xl font-semibold text-ink mb-3">Something went wrong</h1>
      <p className="text-muted mb-8 text-sm max-w-sm">
        Sorry — this page hit an unexpected error. Try again, and if it keeps happening, head back home.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent-dark transition-colors cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 border border-hairline text-ink font-semibold text-sm rounded-xl hover:bg-surface transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
