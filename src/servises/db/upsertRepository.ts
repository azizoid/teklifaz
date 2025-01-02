import { prisma } from "@/lib/prismadb";

interface RepoConditions {
  avatar_url: string;
  description: string;
  stars: number;
  html_url: string;
}

export const upsertRepository = async (
  hash: string,
  repoName: string,
  owner: string,
  repoConditions: RepoConditions,
) => {
  return prisma.repository.upsert({
    where: { name: hash },
    update: repoConditions,
    create: {
      name: hash,
      repo_name: repoName,
      owner,
      ...repoConditions,
    },
  });
};
