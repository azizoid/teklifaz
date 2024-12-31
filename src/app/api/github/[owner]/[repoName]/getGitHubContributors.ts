import { octokit } from "@/lib/octokit";
import { fetchWithEtag, GitHubRequest } from "@/utils/getEtag";
import { RestEndpointMethodTypes } from "@octokit/rest";

type GitHubListContributorsType = RestEndpointMethodTypes["repos"]["listContributors"]["response"];

export const getGitHubContributors = async (
  owner: string,
  repoName: string,
) => {
  const request: GitHubRequest = {
    href: octokit.repos.listContributors.endpoint({ owner, repo: repoName }).url,
    fetchData: (etag?: string | null) => octokit.repos.listContributors({
      owner,
      repo: repoName,
      ...(etag && { headers: { "If-None-Match": etag } }),
    })
  }

  return fetchWithEtag<GitHubListContributorsType>(request);
}