import { CustomError } from "@/lib/CustomError";
import { octokit } from "@/lib/octokit";

export const fetchGitHubContributors = async (
  owner: string,
  repoName: string,
  etag?: string | null,
) => {
  try {
    return await octokit.repos.listContributors({
      owner,
      repo: repoName,
      ...(etag && { headers: { "If-None-Match": etag } }),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 304) {
      throw new CustomError("No changes detected in the repository.", 304);
    }
    throw error;
  }
};
