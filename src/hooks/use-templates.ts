"use client";

import { useState, useEffect } from "react";
import type { WorkflowTemplate } from "@/lib/templates";

export function useTemplates() {
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetch("/api/templates")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch templates");
        return res.json();
      })
      .then((data: WorkflowTemplate[]) => mounted && setTemplates(data))
      .catch((e) => mounted && setError(e instanceof Error ? e.message : "Unknown error"))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return { templates, loading, error };
}
