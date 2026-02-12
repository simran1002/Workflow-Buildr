"use client";

import { useState } from "react";
import { WorkflowForm } from "@/features/workflows/workflow-form";
import { WorkflowList } from "@/features/workflows/workflow-list";
import { TemplateSelector } from "@/features/workflows/template-selector";
import { useWorkflows } from "@/hooks/use-workflows";
import type { WorkflowTemplate } from "@/lib/templates";

export default function WorkflowsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const { workflows, loading, error, refetch } = useWorkflows();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Workflows</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Create and manage your AI workflows.</p>
      </div>

      <TemplateSelector
        onSelect={(t) => setSelectedTemplate(t)}
        selectedId={selectedTemplate?.id ?? null}
      />

      <WorkflowForm
        template={selectedTemplate}
        onSuccess={() => {
          setSelectedTemplate(null);
          refetch();
        }}
      />

      <div>
        <h2 className="mb-4 text-xl font-semibold">Your workflows</h2>
        <WorkflowList
          workflows={workflows}
          loading={loading}
          error={error}
          onEdit={refetch}
          onDelete={refetch}
          onDuplicate={refetch}
        />
      </div>
    </div>
  );
}
