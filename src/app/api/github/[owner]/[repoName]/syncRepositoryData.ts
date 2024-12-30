import { prisma } from "@/lib/prismadb";
import { getGitHubRepository } from "./getGitHubRepository";
import { OwnerRepoParams } from "@/lib/github.types";
import { getGitHubContributors } from "./getGitHubContributors";
import { Repository } from "@prisma/client";

interface RepositoryServiceArgs extends OwnerRepoParams {
  id: string;
  etag?: string | null;
}

export const syncRepositoryData = async (args: RepositoryServiceArgs) => {
  const { id, owner, repoName, etag } = args;

  const githubResponse = await getGitHubRepository(owner, repoName, etag);
  const contributorsResponse = await getGitHubContributors(owner, repoName);
  const activity = contributorsResponse.data.reduce(
    (acc, curr) => acc + curr.contributions,
    0,
  );

  const conditions: Partial<Repository> = {
    avatar_url: githubResponse.data.owner.avatar_url,
    description: githubResponse.data.description || "",
    stars: githubResponse.data.stargazers_count || 0,
    activity,
    html_url: githubResponse.data.html_url,
    contributors: JSON.stringify(contributorsResponse.data),
    etag: githubResponse.headers.etag || null,
    lastUpdated: new Date(),
  };

  return prisma.repository.upsert({
    where: { name: id },
    update: conditions,
    create: {
      name: id,
      repo_name: repoName,
      owner,
      ...conditions,
    },
  });
};
