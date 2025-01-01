import { handleNotModified } from "@/utils/handleNotModified";
import { prisma } from "@/lib/prismadb";
import { syncRepositoryData } from "./syncRepositoryData";

export const syncRepository = async (
  name: string,
  owner: string,
  repoName: string,
) => {
  const existingRepo = await prisma.repository.findUnique({
    where: { name },
  });

  const safeService = handleNotModified(syncRepositoryData);

  return safeService({
    name,
    owner,
    repoName,
    existingRecord: existingRepo,
    notFoundMessage: "Weird! No changes detected, but repository not found.",
  });
};
