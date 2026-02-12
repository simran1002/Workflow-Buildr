import { NextRequest, NextResponse } from "next/server";
import { runWorkflowSchema } from "@/lib/validators";
import { executeRun, getRun, getRuns } from "@/services/runService";
import { ZodError } from "zod";

export async function handleRunWorkflow(
  request: NextRequest
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const input = runWorkflowSchema.parse(body);
    const run = await executeRun(input);
    return NextResponse.json(run, { status: 201 });
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

export async function handleGetRun(
  _request: NextRequest,
  id: string
): Promise<NextResponse> {
  try {
    const run = await getRun(id);
    if (!run) {
      return NextResponse.json({ error: "Run not found" }, { status: 404 });
    }
    return NextResponse.json(run);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function handleGetRecentRuns(): Promise<NextResponse> {
  try {
    const runs = await getRuns(5);
    return NextResponse.json(runs);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
