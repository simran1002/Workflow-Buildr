"use client";

import Link from "next/link";
import { useWorkflows } from "@/hooks/use-workflows";
import { useStats } from "@/hooks/use-stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Workflow, Play, History, TrendingUp, ArrowRight, Zap } from "lucide-react";

export default function DashboardPage() {
  const { workflows, loading: workflowsLoading } = useWorkflows();
  const { stats, loading: statsLoading } = useStats();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Dashboard</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Overview of your workflow automation.</p>
      </div>

      {statsLoading ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16 mt-2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="glass border-indigo-200/50 dark:border-indigo-800/30 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-400" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Workflow className="h-4 w-4" />
                Workflows
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-3xl font-bold">{stats?.workflowCount ?? 0}</p>
              <Link href="/workflows">
                <Button variant="ghost" size="sm" className="mt-2 -ml-2">
                  Manage <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass border-emerald-200/50 dark:border-emerald-800/30 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Runs
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-3xl font-bold">{stats?.runCount ?? 0}</p>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="mt-2 -ml-2">
                  View history <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass border-amber-200/50 dark:border-amber-800/30 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-400" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Last Run
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {stats?.lastRun ? (
                  <>
                    <p className="font-semibold truncate">{stats.lastRun.workflowName}</p>
                    <Badge variant={stats.lastRun.status === "success" ? "success" : "warning"} className="mt-2">
                      {stats.lastRun.status}
                    </Badge>
                    <Link href={`/history?id=${stats.lastRun.id}`}>
                      <Button variant="ghost" size="sm" className="mt-2 -ml-2">
                        View details <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">No runs yet</p>
                )}
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="glass">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with common tasks.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/run">
            <Button size="lg" className="gap-2">
              <Play className="h-5 w-5" />
              Run Workflow
            </Button>
          </Link>
          <Link href="/workflows">
            <Button variant="outline" size="lg" className="gap-2">
              <Workflow className="h-5 w-5" />
              Create Workflow
            </Button>
          </Link>
          <Link href="/history">
            <Button variant="outline" size="lg" className="gap-2">
              <History className="h-5 w-5" />
              View History
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Workflows</h2>
        {workflowsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-in">
                <CardHeader>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : workflows.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Workflow className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">No workflows yet.</p>
              <Link href="/workflows">
                <Button>Create your first workflow</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {workflows.slice(0, 4).map((w) => (
              <Link key={w.id} href={`/run?workflow=${w.id}`}>
                <Card className="transition-all hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800/50 cursor-pointer animate-in">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{w.name}</span>
                      <Badge variant="outline">{w.steps.length} steps</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Run workflow →</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
