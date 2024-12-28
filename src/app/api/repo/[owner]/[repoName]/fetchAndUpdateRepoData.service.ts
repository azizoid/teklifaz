import { prisma } from "@/lib/prismadb";
import { CustomError } from "@/lib/CustomError";
import { fetchGitHubRepo } from "@/utils/fetchGithubRepo";

export const fetchAndUpdateRepoData = async (
  name: string,
  owner: string,
  repoName: string,
) => {
  const repo = await prisma.repository.findUnique({ where: { name } });

  try {
    const githubResponse = await fetchGitHubRepo(owner, repoName, repo?.etag);

    const conditionsData = {
      stars: githubResponse.data.stargazers_count || 0,
      activity: 0, // Placeholder for future logic
      etag: githubResponse.headers.etag || null,
      details: JSON.stringify(githubResponse.data),
      lastUpdated: new Date(),
    };

    if (repo) {
      return prisma.repository.update({
        where: { name },
        data: conditionsData,
      });
    } else {
      return prisma.repository.create({
        data: { name, repo_name: repoName, owner, ...conditionsData },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 304) {
      console.log(
        "304 Not Modified. Returning existing repository from the database.",
      );
      if (repo) {
        return repo;
      }
      throw new CustomError(
        "Weird! No changes detected, but repository not found in the database. ",
        500,
      );
    }
    throw error;
  }
};
