"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function BillingPortalButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/billing-portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("Couldn't open billing. Please try again in a moment.");
    } catch {
      // Paying users need this to manage or cancel, so never fail silently.
      setError("Couldn't open billing. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors disabled:opacity-50 cursor-pointer"
    >
      {loading ? (
        <span className="h-3.5 w-3.5 border-2 border-muted border-t-transparent rounded-full animate-spin" />
      ) : (
        <ExternalLink className="h-3.5 w-3.5" />
      )}
      Manage billing
    </button>
    {error && (
      <p role="alert" className="text-[11px] text-wrong max-w-[12rem] text-center">
        {error}
      </p>
    )}
    </>
  );
}
