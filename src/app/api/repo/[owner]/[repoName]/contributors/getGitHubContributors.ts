import { octokit } from "@/lib/octokit";

export const getGitHubContributors = async (
  owner: string,
  repoName: string,
  etag?: string | null,
) => await octokit.repos.listContributors({
  owner,
  repo: repoName,
  ...(etag && { headers: { "If-None-Match": etag } }),
})