"use client";

import { useSearchParams } from "next/navigation";
import { RunDetail } from "@/features/runs/run-detail";
import { RunHistory } from "@/features/history/run-history";
import { Suspense } from "react";
import Link from "next/link";

function ExportContent() {
  const searchParams = useSearchParams();
  const runId = searchParams.get("id");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Export</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          View run details and export as markdown. Copy or download.
        </p>
      </div>

      {runId ? (
        <RunDetail runId={runId} />
      ) : (
        <div>
          <p className="mb-4 text-sm text-slate-600">
            Select a run from history to export:
          </p>
          <RunHistory linkBase="/export" />
        </div>
      )}
    </div>
  );
}

export default function ExportPage() {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
      <ExportContent />
    </Suspense>
  );
}
