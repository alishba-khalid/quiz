"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, FileText, BookOpen } from "lucide-react";

interface WorksheetItem {
  id: string;
  title: string;
  topic: string;
  gradeLevel: string;
  worksheetType: string;
  questionsCount: number;
  createdAt: string;
}

export default function DashboardClient({
  worksheets: initial,
}: {
  worksheets: WorksheetItem[];
}) {
  const router = useRouter();
  const [worksheets, setWorksheets] = useState(initial);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/worksheets/${id}`, { method: "DELETE" });
      if (res.ok) {
        setWorksheets((prev) => prev.filter((w) => w.id !== id));
        router.refresh();
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (worksheets.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center">
        <BookOpen className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-zinc-900 mb-2">No worksheets yet</h2>
        <p className="text-zinc-500 text-sm mb-6">
          Generate your first worksheet and it will appear here.
        </p>
        <Link
          href="/generator"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors"
        >
          Generate a worksheet
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="font-semibold text-zinc-900">Your worksheets</h2>
        <span className="text-xs text-zinc-400">{worksheets.length} total</span>
      </div>
      <div className="divide-y divide-zinc-50">
        {worksheets.map((w) => (
          <div
            key={w.id}
            className="px-6 py-4 flex items-center gap-4 hover:bg-zinc-50/50 transition-colors group"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-zinc-900 truncate">{w.title}</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {w.gradeLevel} · {w.worksheetType} · {w.questionsCount} questions ·{" "}
                {new Date(w.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={() => handleDelete(w.id)}
              disabled={deletingId === w.id}
              className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
              aria-label="Delete worksheet"
            >
              {deletingId === w.id ? (
                <span className="h-4 w-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin block" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
