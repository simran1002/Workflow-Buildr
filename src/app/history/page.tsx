"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RunHistory } from "@/features/history/run-history";
import { RunDetail } from "@/features/runs/run-detail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function HistoryContent() {
  const searchParams = useSearchParams();
  const runId = searchParams.get("id");

  if (runId) {
    return (
      <div className="space-y-8">
        <div>
          <Link href="/history">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to list
            </Button>
          </Link>
          <RunDetail runId={runId} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text">History</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Last 5 runs. Click to view details.</p>
      </div>
      <RunHistory />
    </div>
  );
}

export default function HistoryPage() {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
      <HistoryContent />
    </Suspense>
  );
}
