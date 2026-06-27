"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

export default function CheckoutButton({ isLoggedIn }: { isLoggedIn: boolean }) {
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
        onClick={handleCheckout}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {loading ? (
          <span className="h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Zap className="h-5 w-5" />
        )}
        {loading ? "Loading..." : isLoggedIn ? "Upgrade to Pro" : "Get Started"}
      </button>
      {error && <p className="text-xs text-red-300 text-center">{error}</p>}
    </div>
  );
}
