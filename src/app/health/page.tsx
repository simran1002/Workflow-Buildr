import { HealthStatus } from "@/features/health/health-status";

export default function HealthPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Health</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">System status check.</p>
      </div>
      <HealthStatus />
    </div>
  );
}
