import { handleNotModified } from "@/utils/handleNotModified";
import { prisma } from "@/lib/prismadb";
import { syncRepositoryData } from "./syncRepositoryData";

export const syncRepository = async (
  id: string,
  owner: string,
  repoName: string,
) => {
  const existingRepo = await prisma.repository.findUnique({
    where: { name: id },
  });

  const safeService = handleNotModified(syncRepositoryData);

  return safeService({
    id,
    owner,
    repoName,
    etag: existingRepo?.etag ?? null,
    existingRecord: existingRepo,
    notFoundMessage: "Weird! No changes detected, but repository not found.",
  });
};
