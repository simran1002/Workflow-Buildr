import { prisma } from "@/db/client";
import { runLlm } from "@/services/llm";

export async function checkDatabase(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export async function checkLlm(): Promise<boolean> {
  try {
    await runLlm("Reply with exactly: OK", "ping");
    return true;
  } catch {
    return false;
  }
}

export async function getHealthStatus() {
  const dbOk = await checkDatabase();
  const llmOk = await checkLlm();

  return {
    backend: true,
    database: dbOk,
    llm: llmOk,
    overall: dbOk && llmOk,
  };
}
