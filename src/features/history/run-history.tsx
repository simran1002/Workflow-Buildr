"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRuns } from "@/hooks/use-runs";
import { Loader2, History, ArrowRight } from "lucide-react";

interface RunHistoryProps {
  linkBase?: string;
}

export function RunHistory({ linkBase = "/history" }: RunHistoryProps) {
  const { runs, loading, error } = useRuns();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
        <CardContent className="py-6">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (runs.length === 0) {
    return (
      <Card className="animate-in">
        <CardContent className="py-16 text-center">
          <History className="mx-auto mb-6 h-16 w-16 text-slate-300 dark:text-slate-600" />
          <p className="text-slate-600 dark:text-slate-400">No runs yet. Execute a workflow to see history.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {runs.map((r) => (
        <Link key={r.id} href={`${linkBase}?id=${r.id}`}>
          <Card className="transition-all hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800/50 animate-in">
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">{r.workflowName}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={r.status === "success" ? "success" : r.status === "failed" ? "destructive" : "warning"}>
                  {r.status}
                </Badge>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
