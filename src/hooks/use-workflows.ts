"use client";

import { useState, useEffect, useCallback } from "react";

interface Step {
  id: string;
  type: string;
  promptTemplate: string;
  order: number;
}

export interface Workflow {
  id: string;
  name: string;
  steps: Step[];
}

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkflows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/workflows");
      if (!res.ok) throw new Error("Failed to fetch workflows");
      const data = await res.json();
      setWorkflows(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  return { workflows, loading, error, refetch: fetchWorkflows };
}
