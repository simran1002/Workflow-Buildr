"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHealth } from "@/hooks/use-health";
import { Check, X, Loader2, RefreshCw } from "lucide-react";

export function HealthStatus() {
  const { status, loading, refetch } = useHealth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!status) {
    return null;
  }

  const items = [
    { key: "backend", label: "Backend", ok: status.backend },
    { key: "database", label: "Database", ok: status.database },
    { key: "llm", label: "LLM", ok: status.llm },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">System Health</h2>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Overall:
            <Badge variant={status.overall ? "success" : "destructive"}>
              {status.overall ? "OK" : "Degraded"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.key} className="flex items-center gap-3">
                {item.ok ? (
                  <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
