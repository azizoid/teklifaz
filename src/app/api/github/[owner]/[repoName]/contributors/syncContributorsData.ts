import { prisma } from "@/lib/prismadb";
import { getGitHubContributors } from "./getGitHubContributors";
import { OwnerRepoParams } from "@/lib/github.types";

interface Contributor {
  login?: string;
  avatar_url?: string;
  html_url?: string;
  contributions: number;
}

interface ContributorsServiceArgs extends OwnerRepoParams {
  repositoryId: number;
  etag?: string | null;
}

export const syncContributorsData = async (args: ContributorsServiceArgs) => {
  const { repositoryId, owner, repoName, etag } = args;

  const { data: contributorsData, headers } = await getGitHubContributors(
    owner,
    repoName,
    etag,
  );
  const contributors = contributorsData.map((c: Contributor) => ({
    login: c.login,
    avatar_url: c.avatar_url,
    html_url: c.html_url,
    contributions: c.contributions,
  }));

  const conditions = {
    contributors: JSON.stringify(contributors),
    etag: headers.etag || null,
    lastUpdated: new Date(),
  };

  return prisma.repoDetails.upsert({
    where: { repositoryId },
    update: conditions,
    create: {
      repositoryId,
      ...conditions,
    },
  });
};
