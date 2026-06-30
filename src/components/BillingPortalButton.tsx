"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function BillingPortalButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/billing-portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // silent — billing portal is non-critical
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}
