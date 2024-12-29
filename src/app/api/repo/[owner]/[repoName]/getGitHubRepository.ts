import { octokit } from "@/lib/octokit";

export const getGitHubRepository = async (
  owner: string,
  repoName: string,
  etag?: string | null,
) => await octokit.repos.get({
  owner,
  repo: repoName,
  ...(etag && { headers: { "If-None-Match": etag } }),
});
