import { z } from "zod";

const stepTypeSchema = z.enum(["clean", "summarize", "extract", "tag"]);

const stepSchema = z.object({
  type: stepTypeSchema,
  promptTemplate: z.string().min(1, "Prompt template is required"),
  order: z.number().int().min(0),
});

export const createWorkflowSchema = z.object({
  name: z.string().min(1, "Workflow name is required").max(200),
  steps: z
    .array(stepSchema)
    .min(2, "At least 2 steps required")
    .max(4, "Maximum 4 steps allowed")
    .refine(
      (steps) => {
        const orders = steps.map((s) => s.order).sort((a, b) => a - b);
        const expected = Array.from({ length: orders.length }, (_, i) => i);
        return JSON.stringify(orders) === JSON.stringify(expected);
      },
      { message: "Step orders must be sequential (0, 1, 2, ...)" }
    ),
});

export const runWorkflowSchema = z.object({
  workflowId: z.string().min(1, "Workflow ID is required"),
  inputText: z.string().min(1, "Input text is required"),
});

export type StepInput = z.infer<typeof stepSchema>;
export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
export type RunWorkflowInput = z.infer<typeof runWorkflowSchema>;
