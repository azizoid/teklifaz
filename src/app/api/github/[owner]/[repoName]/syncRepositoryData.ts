import { prisma } from "@/lib/prismadb";
import { getGitHubRepository } from "./getGitHubRepository";
import { OwnerRepoParams } from "@/lib/github.types";

interface RepositoryServiceArgs extends OwnerRepoParams {
  id: string;
  etag?: string | null;
}

export const syncRepositoryData = async (args: RepositoryServiceArgs) => {
  const { id, owner, repoName, etag } = args;
  const githubResponse = await getGitHubRepository(owner, repoName, etag);

  const conditions = {
    stars: githubResponse.data.stargazers_count || 0,
    activity: 0,
    html_url: githubResponse.data.html_url,
    etag: githubResponse.headers.etag || null,
    details: JSON.stringify(githubResponse.data),
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
