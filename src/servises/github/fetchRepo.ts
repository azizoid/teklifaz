import { octokit } from "@/lib/octokit";
import { getEtag } from "@/utils/fetchWithEtag";
import { Repository } from "@prisma/client";

interface FetchRepoParams {
  owner: string;
  repoName: string;
  existingRepo: Repository | null;
}

export const fetchRepo = async ({
  owner,
  repoName,
  existingRepo,
}: FetchRepoParams) => {
  // Endpoint for the repo
  const repoEndpoint = octokit.repos.get.endpoint({
    owner,
    repo: repoName,
  }).url;

  // Get the ETag from our db if the repo exists
  const etagRepository = existingRepo ? await getEtag(repoEndpoint) : undefined;

  // Fetch the repo from GitHub
  const { data: repositoryData, headers: repositoryHeaders } =
    await octokit.repos.get({
      owner,
      repo: repoName,
      ...(etagRepository && { headers: { "If-None-Match": etagRepository } }),
    });

  return { repositoryData, repositoryHeaders, repoEndpoint };
};
