"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTemplates } from "@/hooks/use-templates";
import type { WorkflowTemplate } from "@/lib/templates";
import { Loader2 } from "lucide-react";

interface TemplateSelectorProps {
  onSelect: (template: WorkflowTemplate) => void;
  selectedId: string | null;
}

export function TemplateSelector({ onSelect, selectedId }: TemplateSelectorProps) {
  const { templates, loading, error } = useTemplates();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Could not load templates: {error}. You can still create workflows manually below.
      </div>
    );
  }

  return (
    <div className="space-y-2 animate-in">
      <h3 className="text-sm font-medium">Prebuilt templates</h3>
      <div className="grid gap-2 sm:grid-cols-3">
        {templates.map((t) => (
          <Card
            key={t.id}
            className={`cursor-pointer transition-all animate-in ${
              selectedId === t.id
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 dark:border-indigo-600"
                : "hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md"
            }`}
            onClick={() => onSelect(t)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{t.name}</CardTitle>
              <CardDescription className="text-xs">{t.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
