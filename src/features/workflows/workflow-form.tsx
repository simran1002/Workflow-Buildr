"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateWorkflow } from "@/hooks/use-create-workflow";
import { useToast } from "@/hooks/use-toast";
import type { CreateWorkflowInput, StepInput } from "@/lib/validators";
import type { WorkflowTemplate } from "@/lib/templates";
import { Plus, Trash2 } from "lucide-react";

const STEP_TYPES = ["clean", "summarize", "extract", "tag"] as const;

interface WorkflowFormProps {
  onSuccess?: () => void;
  template?: WorkflowTemplate | null;
}

export function WorkflowForm({ onSuccess, template }: WorkflowFormProps) {
  const [name, setName] = useState(template?.name ?? "");
  const [steps, setSteps] = useState<StepInput[]>(
    template?.steps ?? [
      { type: "clean", promptTemplate: "", order: 0 },
      { type: "summarize", promptTemplate: "", order: 1 },
    ]
  );
  const { create, loading, error: createError } = useCreateWorkflow();
  const { toast } = useToast();

  const addStep = () => {
    if (steps.length >= 4) return;
    setSteps([...steps, { type: "clean", promptTemplate: "", order: steps.length }]);
  };

  const removeStep = (idx: number) => {
    if (steps.length <= 2) return;
    const next = steps.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i }));
    setSteps(next);
  };

  const updateStep = (idx: number, updates: Partial<StepInput>) => {
    setSteps(steps.map((s, i) => (i === idx ? { ...s, ...updates } : s)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Validation", description: "Workflow name is required", variant: "destructive" });
      return;
    }
    const validSteps = steps.filter((s) => s.promptTemplate.trim());
    if (validSteps.length < 2) {
      toast({ title: "Validation", description: "At least 2 steps with prompts required", variant: "destructive" });
      return;
    }
    const input: CreateWorkflowInput = {
      name: name.trim(),
      steps: validSteps.map((s, i) => ({ ...s, order: i })),
    };
    const result = await create(input);
    if (result) {
      toast({ title: "Success", description: "Workflow created" });
      setName("");
      setSteps([
        { type: "clean", promptTemplate: "", order: 0 },
        { type: "summarize", promptTemplate: "", order: 1 },
      ]);
      onSuccess?.();
    } else {
      toast({
        title: "Error",
        description: createError ?? "Failed to create workflow",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="glass animate-in">
        <CardHeader>
          <CardTitle className="gradient-text">Create Workflow</CardTitle>
          <CardDescription>Add 2–4 steps. Use {"{input}"} in prompts to reference the previous output.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My workflow"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Steps</label>
              <Button type="button" variant="outline" size="sm" onClick={addStep} disabled={steps.length >= 4}>
                <Plus className="mr-1 h-4 w-4" />
                Add
              </Button>
            </div>

            {steps.map((step, idx) => (
              <Card key={idx}>
                <CardContent className="pt-4">
                  <div className="flex justify-between gap-2">
                    <div className="flex flex-1 gap-2">
                      <Select
                        value={step.type}
                        onChange={(e) => updateStep(idx, { type: e.target.value as StepInput["type"] })}
                      >
                        {STEP_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStep(idx)}
                        disabled={steps.length <= 2}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    className="mt-2"
                    value={step.promptTemplate}
                    onChange={(e) => updateStep(idx, { promptTemplate: e.target.value })}
                    placeholder={`Prompt for ${step.type} step. Use {input} for previous output.`}
                    rows={3}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Workflow"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
