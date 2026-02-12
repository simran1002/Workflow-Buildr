"use client";

import { Suspense } from "react";
import { RunForm } from "@/features/runs/run-form";
import { Loader2 } from "lucide-react";

function RunFormFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
    </div>
  );
}

export default function RunPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Run Workflow</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Execute a workflow with your input text.</p>
      </div>

      <Suspense fallback={<RunFormFallback />}>
        <RunForm />
      </Suspense>
    </div>
  );
}
