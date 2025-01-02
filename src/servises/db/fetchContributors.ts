import { prisma } from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

export const upsertContributors = async (
  repositoryId: number,
  contributorsOrdered: Prisma.InputJsonValue[],
) => {
  const contributionsConditions = {
    repository_id: repositoryId,
    content: contributorsOrdered,
  };

  return prisma.contributors.upsert({
    where: { repository_id: repositoryId },
    update: contributionsConditions,
    create: contributionsConditions,
  });
};
