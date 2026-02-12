import { handleHealthCheck } from "@/api/controllers/healthController";

export async function GET(): Promise<Response> {
  return handleHealthCheck();
}
