export type StepType = "clean" | "summarize" | "extract" | "tag";

export interface StepInput {
  type: StepType;
  promptTemplate: string;
  order: number;
}

export interface WorkflowInput {
  name: string;
  steps: StepInput[];
}

export interface RunInput {
  workflowId: string;
  inputText: string;
}

export interface RunStepResult {
  stepOrder: number;
  stepType: string;
  output: string;
}

export interface RunResult {
  id: string;
  workflowId: string;
  workflowName: string;
  inputText: string;
  status: "success" | "partial" | "failed";
  outputs: RunStepResult[];
  createdAt: Date;
}
