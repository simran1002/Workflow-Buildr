"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Loader2 } from "lucide-react";
import type { Run } from "@/hooks/use-run-workflow";

interface RunDetailProps {
  runId: string;
}

function runToMarkdown(run: Run): string {
  const lines = [
    `# Run: ${run.workflowName}`,
    ``,
    `**Workflow ID:** ${run.workflowId}`,
    `**Status:** ${run.status}`,
    `**Created:** ${new Date(run.createdAt).toISOString()}`,
    ``,
    `## Input`,
    ``,
    run.inputText,
    ``,
    `## Outputs`,
    ``,
  ];
  run.outputs.forEach((o, i) => {
    lines.push(`### Step ${i + 1}: ${o.stepType}`);
    lines.push(``);
    lines.push(o.output);
    lines.push(``);
  });
  return lines.join("\n");
}

export function RunDetail({ runId }: RunDetailProps) {
  const [run, setRun] = useState<Run | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`/api/runs/${runId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setRun(data);
      })
      .catch(() => setRun(null))
      .finally(() => setLoading(false));
  }, [runId]);

  const handleCopy = () => {
    if (!run) return;
    const md = runToMarkdown(run);
    navigator.clipboard.writeText(md);
    toast({ title: "Copied", description: "Markdown copied to clipboard" });
  };

  const handleDownload = () => {
    if (!run) return;
    const md = runToMarkdown(run);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `run-${run.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded", description: "Markdown file saved" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!run) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-slate-600">Run not found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold gradient-text">{run.workflowName}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {new Date(run.createdAt).toLocaleString()} · <span className="font-medium capitalize">{run.status}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="mr-1 h-4 w-4" />
            Copy markdown
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-1 h-4 w-4" />
            Download .md
          </Button>
        </div>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base">Input</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap rounded-lg bg-slate-100 dark:bg-slate-800 p-4 text-sm">{run.inputText}</pre>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Step Outputs</h3>
        <div className="space-y-4">
          {run.outputs.map((o, i) => (
            <Card key={i} className="animate-in glass overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-indigo-500/50 to-cyan-500/50" />
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/40 w-7 h-7 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300">
                    {i + 1}
                  </span>
                  {o.stepType}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap rounded-lg bg-slate-100 dark:bg-slate-800 p-4 text-sm">{o.output}</pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
