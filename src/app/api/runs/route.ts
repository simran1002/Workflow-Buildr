import { NextRequest } from "next/server";
import {
  handleRunWorkflow,
  handleGetRecentRuns,
} from "@/api/controllers/runController";

export async function GET(): Promise<Response> {
  return handleGetRecentRuns();
}

export async function POST(request: NextRequest): Promise<Response> {
  return handleRunWorkflow(request);
}
