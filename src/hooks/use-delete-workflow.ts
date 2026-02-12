"use client";

import { useState, useCallback } from "react";

interface UseDeleteWorkflowReturn {
  deleteWorkflow: (id: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useDeleteWorkflow(): UseDeleteWorkflowReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteWorkflow = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/workflows/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to delete workflow");
      }
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteWorkflow, loading, error };
}
