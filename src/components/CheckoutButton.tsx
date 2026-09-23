"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

export default function CheckoutButton({
  isLoggedIn,
  compact = false,
}: {
  isLoggedIn: boolean;
  compact?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError("Failed to start checkout. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 ${compact ? "px-3 py-2 text-xs rounded-lg" : "px-6 py-3 rounded-xl"} bg-white text-accent font-semibold hover:bg-accent-soft disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer`}
      >
        {loading ? (
          <span className={`${compact ? "h-4 w-4" : "h-5 w-5"} border-2 border-accent border-t-transparent rounded-full animate-spin`} />
        ) : (
          <Zap className={compact ? "h-4 w-4" : "h-5 w-5"} />
        )}
        {loading ? "Loading..." : isLoggedIn ? "Upgrade to Pro" : "Get Started"}
      </button>
      {error && <p className="text-xs text-wrong/80 text-center">{error}</p>}
    </div>
  );
}
