"use client";

import { useState, useEffect, useCallback } from "react";

interface HealthStatus {
  backend: boolean;
  database: boolean;
  llm: boolean;
  overall: boolean;
}

export function useHealth() {
  const [status, setStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus({
        backend: false,
        database: false,
        llm: false,
        overall: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return { status, loading, refetch: check };
}
