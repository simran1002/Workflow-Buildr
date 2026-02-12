import { prisma } from "@/db/client";
import type { CreateWorkflowInput } from "@/lib/validators";

export async function createWorkflow(input: CreateWorkflowInput) {
  return prisma.workflow.create({
    data: {
      name: input.name,
      steps: {
        create: input.steps.map((s) => ({
          type: s.type,
          promptTemplate: s.promptTemplate,
          order: s.order,
        })),
      },
    },
    include: {
      steps: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getWorkflowById(id: string) {
  return prisma.workflow.findUnique({
    where: { id },
    include: {
      steps: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getAllWorkflows() {
  return prisma.workflow.findMany({
    include: {
      steps: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateWorkflow(id: string, input: CreateWorkflowInput) {
  await prisma.step.deleteMany({ where: { workflowId: id } });
  return prisma.workflow.update({
    where: { id },
    data: {
      name: input.name,
      steps: {
        create: input.steps.map((s) => ({
          type: s.type,
          promptTemplate: s.promptTemplate,
          order: s.order,
        })),
      },
    },
    include: {
      steps: { orderBy: { order: "asc" } },
    },
  });
}

export async function deleteWorkflow(id: string) {
  return prisma.workflow.delete({ where: { id } });
}
