"use client";

import { useState, useEffect, useCallback } from "react";

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

export function useRuns() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRuns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/runs");
      if (!res.ok) throw new Error("Failed to fetch runs");
      const data = await res.json();
      setRuns(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  return { runs, loading, error, refetch: fetchRuns };
}
