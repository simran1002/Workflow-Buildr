import { prisma } from "@/db/client";

export async function getStats() {
  const [workflowCount, runCount, lastRun] = await Promise.all([
    prisma.workflow.count(),
    prisma.run.count(),
    prisma.run.findFirst({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        workflowName: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    workflowCount,
    runCount,
    lastRun,
  };
}
