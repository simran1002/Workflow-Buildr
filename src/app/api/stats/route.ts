import { NextResponse } from "next/server";
import { getStats } from "@/services/statsService";

export async function GET(): Promise<Response> {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
