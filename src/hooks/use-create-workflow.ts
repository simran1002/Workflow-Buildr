"use client";

import { useState, useCallback } from "react";
import type { CreateWorkflowInput } from "@/lib/validators";

interface UseCreateWorkflowReturn {
  create: (input: CreateWorkflowInput) => Promise<{ id: string } | null>;
  loading: boolean;
  error: string | null;
}

export function useCreateWorkflow(): UseCreateWorkflowReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (input: CreateWorkflowInput): Promise<{ id: string } | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? data.details?.[0]?.message ?? "Failed to create workflow");
      }
      return { id: data.id };
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}
