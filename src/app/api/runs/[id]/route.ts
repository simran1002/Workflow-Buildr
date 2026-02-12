import { NextRequest } from "next/server";
import { handleGetRun } from "@/api/controllers/runController";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  return handleGetRun(_request, id);
}
