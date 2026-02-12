import { runLlm } from "@/services/llm";
import { getWorkflowById } from "@/db/repositories/workflowRepository";
import { createRun, getRunById, getRecentRuns } from "@/db/repositories/runRepository";
import type { RunWorkflowInput } from "@/lib/validators";
import type { RunStepResult } from "@/types";

function resolvePrompt(template: string, input: string): string {
  return template.replace(/\{input\}/g, input);
}

export async function executeRun(input: RunWorkflowInput) {
  const workflow = await getWorkflowById(input.workflowId);
  if (!workflow) {
    throw new Error("Workflow not found");
  }

  const steps = workflow.steps.sort((a, b) => a.order - b.order);
  const outputs: RunStepResult[] = [];
  let currentInput = input.inputText;
  let status: "success" | "partial" | "failed" = "success";

  for (const step of steps) {
    try {
      const prompt = resolvePrompt(step.promptTemplate, currentInput);
      const output = await runLlm(prompt, currentInput);
      outputs.push({
        stepOrder: step.order,
        stepType: step.type,
        output,
      });
      currentInput = output;
    } catch {
      status = outputs.length > 0 ? "partial" : "failed";
      outputs.push({
        stepOrder: step.order,
        stepType: step.type,
        output: "[Step failed]",
      });
    }
  }

  return createRun(
    workflow.id,
    workflow.name,
    input.inputText,
    status,
    outputs
  );
}

export async function getRun(id: string) {
  return getRunById(id);
}

export async function getRuns(limit?: number) {
  return getRecentRuns(limit);
}
