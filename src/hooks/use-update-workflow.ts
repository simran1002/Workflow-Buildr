"use client";

import { useState, useCallback } from "react";
import type { CreateWorkflowInput } from "@/lib/validators";

interface UseUpdateWorkflowReturn {
  update: (id: string, input: CreateWorkflowInput) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useUpdateWorkflow(): UseUpdateWorkflowReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, input: CreateWorkflowInput): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/workflows/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? data.details?.[0]?.message ?? "Failed to update workflow");
      }
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}
