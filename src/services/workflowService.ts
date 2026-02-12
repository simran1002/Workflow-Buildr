import {
  createWorkflow as repoCreate,
  getWorkflowById,
  getAllWorkflows,
  updateWorkflow as repoUpdate,
  deleteWorkflow as repoDelete,
} from "@/db/repositories/workflowRepository";
import type { CreateWorkflowInput } from "@/lib/validators";

export async function createWorkflow(input: CreateWorkflowInput) {
  return repoCreate(input);
}

export async function getWorkflow(id: string) {
  return getWorkflowById(id);
}

export async function listWorkflows() {
  return getAllWorkflows();
}

export async function updateWorkflow(id: string, input: CreateWorkflowInput) {
  return repoUpdate(id, input);
}

export async function deleteWorkflow(id: string) {
  return repoDelete(id);
}
