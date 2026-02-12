"use client";

import { useState, useEffect, useCallback } from "react";

interface Stats {
  workflowCount: number;
  runCount: number;
  lastRun: {
    id: string;
    workflowName: string;
    status: string;
    createdAt: string;
  } | null;
}

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      // Disable HTTP caching so we always get a fresh 200 response
      const res = await fetch("/api/stats", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
    } catch {
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refetch: fetchStats };
}
