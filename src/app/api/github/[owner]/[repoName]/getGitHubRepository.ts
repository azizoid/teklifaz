import { octokit } from "@/lib/octokit";
import { fetchWithEtag, GitHubRequest } from "@/utils/fetchWithEtag";
import { RestEndpointMethodTypes } from "@octokit/rest";

type GitHubRepositoryType = RestEndpointMethodTypes["repos"]["get"]["response"];

export const getGitHubRepository = async (
  owner: string,
  repoName: string,
) => {
  const request: GitHubRequest = {
    href: octokit.repos.get.endpoint({ owner, repo: repoName }).url,
    fetchData: (etag?: string | null) => octokit.repos.get({
      owner,
      repo: repoName,
      ...(etag && { headers: { "If-None-Match": etag } }),
    })
  }

  return fetchWithEtag<GitHubRepositoryType>(request);
}