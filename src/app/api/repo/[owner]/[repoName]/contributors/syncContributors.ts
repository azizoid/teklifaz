import { handleNotModified } from "@/utils/handleNotModified";
import { prisma } from "@/lib/prismadb";
import { syncContributorsData } from "./syncContributorsData";

export const syncContributors = async (id: number, owner: string, repoName: string) => {
  const repoDetails = await prisma.repoDetails.findUnique({
    where: { repositoryId: id },
  });

  const safeService = handleNotModified(syncContributorsData);

  return safeService({
    repositoryId: id,
    owner,
    repoName,
    etag: repoDetails?.etag ?? null,
    existingRecord: repoDetails,
    notFoundMessage: "Weird! No changes detected, but repository details not found.",
  });
};