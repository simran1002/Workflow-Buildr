import { NextResponse } from "next/server";
import { WORKFLOW_TEMPLATES } from "@/lib/templates";

export async function GET(): Promise<Response> {
  return NextResponse.json(WORKFLOW_TEMPLATES);
}
