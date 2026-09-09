"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, ChevronDown, Youtube, FileText, Sparkles, LayoutGrid } from "lucide-react";

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

const toolsLinks = [
  {
    label: "AI Worksheet Studio",
    href: "/generator",
    desc: "Generate custom assessments for any topic",
    icon: Sparkles,
  },
  {
    label: "YouTube to Quiz",
    href: "/youtube-to-quiz",
    desc: "Turn video lecture transcripts into quizzes",
    icon: Youtube,
    badge: "New",
  },
  {
    label: "PDF to Quiz",
    href: "/pdf-to-quiz",
    desc: "Convert notes & documents into quizzes",
    icon: FileText,
  },
  {
    label: "Worksheet Generator",
    href: "/worksheet-generator",
    desc: "Printable worksheets with answer keys",
    icon: LayoutGrid,
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close tools dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-hairline no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <LogoMark />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                type="button"
                onClick={() => setToolsOpen(!toolsOpen)}
                onMouseEnter={() => setToolsOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  toolsOpen ? "text-ink bg-hairline/60" : "text-muted hover:text-ink hover:bg-hairline/40"
                }`}
              >
                Tools
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              {toolsOpen && (
                <div
                  onMouseLeave={() => setToolsOpen(false)}
                  className="absolute top-full left-0 mt-1 w-72 bg-surface rounded-2xl border border-hairline shadow-lg p-2 space-y-1 animate-fade-in z-50"
                >
                  {toolsLinks.map((t) => {
                    const Icon = t.icon;
                    return (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-canvas transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-hairline/50 group-hover:bg-accent-soft text-muted group-hover:text-accent transition-colors flex-shrink-0 mt-0.5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-semibold text-ink group-hover:text-accent transition-colors">
                              {t.label}
                            </p>
                            {t.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-red-500/10 text-red-600 rounded">
                                {t.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted truncate mt-0.5">{t.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct header links */}
            <Link
              href="/youtube-to-quiz"
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-muted hover:text-ink rounded-lg hover:bg-hairline/40 transition-colors"
            >
              <Youtube className="h-3.5 w-3.5 text-red-500" />
              YouTube to Quiz
            </Link>

            <Link
              href="/pdf-to-quiz"
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-muted hover:text-ink rounded-lg hover:bg-hairline/40 transition-colors"
            >
              <FileText className="h-3.5 w-3.5 text-blue-500" />
              PDF to Quiz
            </Link>

            <Link
              href="/pricing"
              className="px-3.5 py-2 text-sm font-medium text-muted hover:text-ink rounded-lg hover:bg-hairline/40 transition-colors"
            >
              Pricing
            </Link>

            <Link
              href="/blog"
              className="px-3.5 py-2 text-sm font-medium text-muted hover:text-ink rounded-lg hover:bg-hairline/40 transition-colors"
            >
              Blog
            </Link>
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
        <div className="md:hidden border-t border-hairline bg-canvas/98 backdrop-blur-md animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <p className="px-3 text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Tools
            </p>
            <Link
              href="/youtube-to-quiz"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-ink rounded-lg hover:bg-hairline/60 transition-colors"
            >
              <Youtube className="h-4 w-4 text-red-500" />
              YouTube to Quiz
            </Link>
            <Link
              href="/pdf-to-quiz"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-ink rounded-lg hover:bg-hairline/60 transition-colors"
            >
              <FileText className="h-4 w-4 text-blue-500" />
              PDF to Quiz
            </Link>
            <Link
              href="/generator"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-ink rounded-lg hover:bg-hairline/60 transition-colors"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              AI Worksheet Studio
            </Link>
            <Link
              href="/worksheet-generator"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-ink rounded-lg hover:bg-hairline/60 transition-colors"
            >
              <LayoutGrid className="h-4 w-4 text-muted" />
              Worksheet Generator
            </Link>

            <p className="px-3 text-[11px] font-bold text-muted uppercase tracking-wider mt-3 mb-1">
              Navigation
            </p>
            <Link
              href="/features"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-ink rounded-lg hover:bg-hairline/60 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-ink rounded-lg hover:bg-hairline/60 transition-colors"
            >
              Pricing (5 free/mo)
            </Link>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-ink rounded-lg hover:bg-hairline/60 transition-colors"
            >
              Blog
            </Link>
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
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
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
                  Start free (5 free generations)
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
