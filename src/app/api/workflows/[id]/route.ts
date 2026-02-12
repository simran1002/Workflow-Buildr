import { NextRequest } from "next/server";
import {
  handleGetWorkflow,
  handleUpdateWorkflow,
  handleDeleteWorkflow,
} from "@/api/controllers/workflowController";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  return handleGetWorkflow(_request, id);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  return handleUpdateWorkflow(request, id);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  return handleDeleteWorkflow(_request, id);
}
