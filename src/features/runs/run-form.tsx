"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkflows } from "@/hooks/use-workflows";
import { useRunWorkflow } from "@/hooks/use-run-workflow";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function RunForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const presetId = searchParams.get("workflow");
  const { workflows, loading: workflowsLoading } = useWorkflows();
  const { run, loading: runLoading } = useRunWorkflow();
  const { toast } = useToast();
  const [workflowId, setWorkflowId] = useState("");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (presetId && workflows.length > 0) {
      const found = workflows.find((w) => w.id === presetId);
      if (found) setWorkflowId(found.id);
    } else if (workflows.length > 0 && !workflowId) {
      setWorkflowId(workflows[0].id);
    }
  }, [presetId, workflows, workflowId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workflowId || !inputText.trim()) {
      toast({ title: "Validation", description: "Select a workflow and enter text", variant: "destructive" });
      return;
    }
    const result = await run(workflowId, inputText.trim());
    if (result) {
      toast({ title: "Complete", description: `Run finished: ${result.status}` });
      router.push(`/history?id=${result.id}`);
    } else {
      toast({ title: "Error", description: "Workflow run failed", variant: "destructive" });
    }
  };

  if (workflowsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (workflows.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-slate-600">Create a workflow first to run it.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="glass animate-in">
        <CardHeader>
          <CardTitle className="gradient-text">Run Workflow</CardTitle>
          <CardDescription>Select a workflow and provide input text. Steps run sequentially.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Workflow</label>
            <Select value={workflowId} onChange={(e) => setWorkflowId(e.target.value)} required>
              <option value="">Select workflow</option>
              {workflows.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Input text</label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to process..."
              rows={6}
              required
            />
          </div>
          <Button type="submit" disabled={runLoading}>
            {runLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              "Run"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
