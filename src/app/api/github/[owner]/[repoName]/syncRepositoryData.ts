import { prisma } from "@/lib/prismadb";
import { getGitHubRepository } from "./getGitHubRepository";
import { OwnerRepoParams } from "@/lib/github.types";
import { Repository } from "@prisma/client";

interface RepositoryServiceArgs extends OwnerRepoParams {
  name: string;
}

export const syncRepositoryData = async (
  { name, owner, repoName }: RepositoryServiceArgs,
): Promise<Repository> => {
  const githubResponse = await getGitHubRepository(owner, repoName);

  const conditions = {
    avatar_url: githubResponse.data.owner.avatar_url,
    description: githubResponse.data.description || "",
    stars: githubResponse.data.stargazers_count || 0,
    html_url: githubResponse.data.html_url
  };

  return prisma.repository.upsert({
    where: { name },
    update: conditions,
    create: {
      name,
      repo_name: repoName,
      owner,
      ...conditions,
    },
  });
};
