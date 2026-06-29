"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2.5 8.5 L6.5 12.5 L13.5 4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="font-bold text-lg tracking-tight text-ink">
        Quiz<span className="text-accent">Kraft</span>
      </span>
    </div>
  );
}

const navLinks = [
  { label: "Generator", href: "/generator" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-hairline no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <LogoMark />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-ink rounded-lg hover:bg-hairline/60 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted hover:text-ink transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center uppercase">
                    {(session.user?.name || session.user?.email || "U")[0]}
                  </span>
                  Dashboard
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted hover:text-ink hover:bg-hairline/60 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-muted hover:text-ink transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent-dark rounded-xl transition-colors shadow-sm shadow-accent/20"
                >
                  Start free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-muted hover:text-ink hover:bg-hairline/60 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-hairline bg-canvas/95 backdrop-blur-md animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-ink rounded-lg hover:bg-hairline/60 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-hairline space-y-2">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-ink rounded-lg hover:bg-hairline/60 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-muted border border-hairline rounded-xl hover:bg-hairline/60 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-center text-ink border border-hairline rounded-xl hover:bg-hairline/60 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-semibold text-center text-white bg-accent hover:bg-accent-dark rounded-xl transition-colors"
                >
                  Start free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
