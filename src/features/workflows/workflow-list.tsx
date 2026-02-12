"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Workflow } from "@/hooks/use-workflows";
import { useDeleteWorkflow } from "@/hooks/use-delete-workflow";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Workflow as WorkflowIcon,
  Play,
  Pencil,
  Trash2,
  Copy,
  Search,
  MoreVertical,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import type { CreateWorkflowInput } from "@/lib/validators";

export interface WorkflowEditInput {
  id: string;
  name: string;
  steps: Array<{ type: string; promptTemplate: string; order: number }>;
}

interface WorkflowListProps {
  workflows: Workflow[];
  loading: boolean;
  error: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function WorkflowList({
  workflows,
  loading,
  error,
  onEdit,
  onDelete,
  onDuplicate,
}: WorkflowListProps) {
  const [search, setSearch] = useState("");
  const [editWorkflow, setEditWorkflow] = useState<WorkflowEditInput | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const { deleteWorkflow } = useDeleteWorkflow();
  const { toast } = useToast();

  const filtered = useMemo(() => {
    if (!search.trim()) return workflows;
    const q = search.toLowerCase();
    return workflows.filter((w) => w.name.toLowerCase().includes(q));
  }, [workflows, search]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete workflow "${name}"? This cannot be undone.`)) return;
    const ok = await deleteWorkflow(id);
    if (ok) {
      toast({ title: "Deleted", description: "Workflow removed" });
      onDelete?.();
      setMenuOpen(null);
    } else {
      toast({ title: "Error", description: "Failed to delete workflow", variant: "destructive" });
    }
  };

  const handleDuplicate = (w: Workflow) => {
    setEditWorkflow({
      id: "",
      name: `${w.name} (copy)`,
      steps: w.steps.map((s) => ({ type: s.type, promptTemplate: s.promptTemplate, order: s.order })),
    });
    setMenuOpen(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
        <CardContent className="py-6">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (workflows.length === 0) {
    return (
      <Card className="animate-in">
        <CardContent className="py-16 text-center">
          <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-6 w-fit mx-auto mb-6">
            <WorkflowIcon className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No workflows yet</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
            Create your first workflow to automate text processing with AI-powered steps.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">Create one using the form above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {filtered.length} workflow{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((w) => (
          <Card
            key={w.id}
            className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800/50 animate-in"
          >
            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-indigo-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <Link href={`/run?workflow=${w.id}`} className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <WorkflowIcon className="h-4 w-4 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                    <span className="font-medium truncate">{w.name}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{w.steps.length} steps</p>
                </Link>
                <div className="flex items-center gap-1">
                  <Link href={`/run?workflow=${w.id}`}>
                    <Button variant="ghost" size="icon" title="Run">
                      <Play className="h-4 w-4" />
                    </Button>
                  </Link>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMenuOpen(menuOpen === w.id ? null : w.id)}
                      title="More actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    {menuOpen === w.id && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setMenuOpen(null)}
                        />
                        <div className="absolute right-0 top-full mt-1 z-50 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg min-w-[140px]">
                          <button
                            onClick={() => {
                              setEditWorkflow({
                                id: w.id,
                                name: w.name,
                                steps: w.steps.map((s) => ({ type: s.type, promptTemplate: s.promptTemplate, order: s.order })),
                              });
                              setMenuOpen(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Pencil className="h-4 w-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDuplicate(w)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Copy className="h-4 w-4" /> Duplicate
                          </button>
                          <button
                            onClick={() => handleDelete(w.id, w.name)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={`/run?workflow=${w.id}`}>
                <Button size="sm" className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Run workflow
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!editWorkflow}
        onOpenChange={(open) => !open && setEditWorkflow(null)}
        title={editWorkflow?.id ? "Edit Workflow" : "Create Workflow (from copy)"}
      >
        {editWorkflow && (
          <WorkflowEditForm
            workflow={editWorkflow}
            onSuccess={() => {
              setEditWorkflow(null);
              onEdit?.();
            }}
            onCancel={() => setEditWorkflow(null)}
          />
        )}
      </Dialog>
    </>
  );
}

interface WorkflowEditFormProps {
  workflow: WorkflowEditInput;
  onSuccess: () => void;
  onCancel: () => void;
}

function WorkflowEditForm({ workflow, onSuccess, onCancel }: WorkflowEditFormProps) {
  const [name, setName] = useState(workflow.name);
  const [steps, setSteps] = useState(
    workflow.steps.map((s) => ({
      type: s.type as "clean" | "summarize" | "extract" | "tag",
      promptTemplate: s.promptTemplate,
      order: s.order,
    }))
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Validation", description: "Name is required", variant: "destructive" });
      return;
    }
    const validSteps = steps.filter((s) => s.promptTemplate.trim());
    if (validSteps.length < 2) {
      toast({ title: "Validation", description: "At least 2 steps with prompts", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const method = workflow.id ? "PUT" : "POST";
      const url = workflow.id ? `/api/workflows/${workflow.id}` : "/api/workflows";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          steps: validSteps.map((s, i) => ({ ...s, order: i })),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Request failed");
      }
      toast({ title: "Success", description: workflow.id ? "Workflow updated" : "Workflow created" });
      onSuccess();
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Steps</label>
        {steps.map((step, idx) => (
          <div key={idx} className="mb-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <select
              value={step.type}
              onChange={(e) =>
                setSteps(steps.map((s, i) => (i === idx ? { ...s, type: e.target.value as typeof step.type } : s)))
              }
              className="w-full mb-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            >
              {["clean", "summarize", "extract", "tag"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <textarea
              value={step.promptTemplate}
              onChange={(e) =>
                setSteps(steps.map((s, i) => (i === idx ? { ...s, promptTemplate: e.target.value } : s)))
              }
              rows={2}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
              placeholder="Prompt template..."
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : workflow.id ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
