import { prisma } from "@/db/client";
import type { RunStepResult } from "@/types";

export async function createRun(
  workflowId: string,
  workflowName: string,
  inputText: string,
  status: string,
  outputs: RunStepResult[]
) {
  return prisma.run.create({
    data: {
      workflowId,
      workflowName,
      inputText,
      status,
      outputs: {
        create: outputs.map((o) => ({
          stepOrder: o.stepOrder,
          stepType: o.stepType,
          output: o.output,
        })),
      },
    },
    include: {
      outputs: {
        orderBy: { stepOrder: "asc" },
      },
    },
  });
}

export async function getRunById(id: string) {
  return prisma.run.findUnique({
    where: { id },
    include: {
      outputs: {
        orderBy: { stepOrder: "asc" },
      },
    },
  });
}

export async function getRunCount() {
  return prisma.run.count();
}

export async function getRecentRuns(limit = 5) {
  return prisma.run.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      outputs: {
        orderBy: { stepOrder: "asc" },
      },
    },
  });
}
