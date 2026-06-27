"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, GraduationCap, LogOut, LogIn } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-zinc-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 font-bold text-xl text-indigo-600">
              <GraduationCap className="h-8 w-8 text-indigo-600 animate-pulse" />
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                QuizKraft
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                href="/quiz-generator"
                className="border-transparent text-zinc-500 hover:border-indigo-500 hover:text-zinc-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              >
                Quiz Generator
              </Link>
              <Link
                href="/pricing"
                className="border-transparent text-zinc-500 hover:border-indigo-500 hover:text-zinc-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="border-transparent text-zinc-500 hover:border-indigo-500 hover:text-zinc-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-600 bg-zinc-50 border border-zinc-100 rounded-full px-3 py-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  {session.user?.name || session.user?.email} 
                  <span className="ml-1 text-xs font-bold uppercase text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    {(session.user as any).plan || "FREE"}
                  </span>
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-zinc-700 bg-zinc-100 hover:bg-zinc-200 focus:outline-none transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden border-t border-zinc-100 bg-white">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/quiz-generator"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:border-indigo-500"
              onClick={toggleMenu}
            >
              Quiz Generator
            </Link>
            <Link
              href="/pricing"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:border-indigo-500"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:border-indigo-500"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="pt-4 pb-4 border-t border-zinc-200">
            {session ? (
              <div className="px-4 space-y-3">
                <div className="text-sm font-medium text-zinc-800">
                  Logged in as: {session.user?.email} ({(session.user as any).plan || "FREE"})
                </div>
                <button
                  onClick={() => {
                    toggleMenu();
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="px-4 space-y-2">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 border border-zinc-300 text-base font-medium rounded-md text-zinc-700 bg-white hover:bg-zinc-50"
                  onClick={toggleMenu}
                >
                  <LogIn className="h-5 w-5" />
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
