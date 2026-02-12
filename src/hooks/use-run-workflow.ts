"use client";

import { useState, useCallback } from "react";

interface RunStepOutput {
  stepOrder: number;
  stepType: string;
  output: string;
}

export interface Run {
  id: string;
  workflowId: string;
  workflowName: string;
  inputText: string;
  status: string;
  outputs: RunStepOutput[];
  createdAt: string;
}

interface UseRunWorkflowReturn {
  run: (workflowId: string, inputText: string) => Promise<Run | null>;
  loading: boolean;
  error: string | null;
}

export function useRunWorkflow(): UseRunWorkflowReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (workflowId: string, inputText: string): Promise<Run | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflowId, inputText }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to run workflow");
      }
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { run, loading, error };
}
