import { NextResponse } from "next/server";
import { getHealthStatus } from "@/services/healthService";

export async function handleHealthCheck(): Promise<NextResponse> {
  try {
    const status = await getHealthStatus();
    const httpStatus = status.overall ? 200 : 503;
    return NextResponse.json(status, { status: httpStatus });
  } catch {
    return NextResponse.json(
      { backend: false, database: false, llm: false, overall: false },
      { status: 503 }
    );
  }
}
