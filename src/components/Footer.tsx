import Link from "next/link";

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2.5 8.5 L6.5 12.5 L13.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="font-bold text-base tracking-tight text-ink">
        Quiz<span className="text-accent">Kraft</span>
      </span>
    </div>
  );
}

const cols = [
  {
    title: "Product",
    links: [
      { label: "Generator", href: "/generator" },
      { label: "Pricing", href: "/pricing" },
      { label: "Features", href: "/#features" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "mailto:hello@quizkraft.app" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-hairline no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <LogoMark />
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Made for teachers and students.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold text-ink uppercase tracking-widest mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted hover:text-ink transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} QuizKraft. All rights reserved.</p>
          <p>Worksheets and quizzes worth handing out — built by AI in seconds.</p>
        </div>
      </div>
    </footer>
  );
}
