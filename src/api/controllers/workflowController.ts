import { NextRequest, NextResponse } from "next/server";
import { createWorkflowSchema } from "@/lib/validators";
import {
  createWorkflow,
  getWorkflow,
  listWorkflows,
  updateWorkflow,
  deleteWorkflow,
} from "@/services/workflowService";
import { ZodError } from "zod";

export async function handleCreateWorkflow(
  request: NextRequest
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const input = createWorkflowSchema.parse(body);
    const workflow = await createWorkflow(input);
    return NextResponse.json(workflow, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function handleGetWorkflow(
  _request: NextRequest,
  id: string
): Promise<NextResponse> {
  try {
    const workflow = await getWorkflow(id);
    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
    }
    return NextResponse.json(workflow);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function handleGetWorkflows(): Promise<NextResponse> {
  try {
    const workflows = await listWorkflows();
    return NextResponse.json(workflows);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function handleUpdateWorkflow(
  request: NextRequest,
  id: string
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const input = createWorkflowSchema.parse(body);
    const workflow = await updateWorkflow(id, input);
    return NextResponse.json(workflow);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function handleDeleteWorkflow(
  _request: NextRequest,
  id: string
): Promise<NextResponse> {
  try {
    await deleteWorkflow(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
