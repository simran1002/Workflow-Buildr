import { NextRequest } from "next/server";
import {
  handleCreateWorkflow,
  handleGetWorkflows,
} from "@/api/controllers/workflowController";

export async function GET(): Promise<Response> {
  return handleGetWorkflows();
}

export async function POST(request: NextRequest): Promise<Response> {
  return handleCreateWorkflow(request);
}
