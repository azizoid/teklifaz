import { CustomError } from "@/lib/CustomError";
import { prisma } from "@/lib/prismadb";

export const isRepoInDb = async (owner: string, repoName: string) => {
  const name = `${owner}/${repoName}`;

  const repo = await prisma.repository.findUnique({ where: { name } });

  if (!repo) {
    console.log(`Repository ${name} not found in the database. Fetching from GitHub...`);
    throw new CustomError(`Repository ${name} not found in the database. Fetching from GitHub...`, 400);
  }

  return repo;
};