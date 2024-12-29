import { prisma } from "@/lib/prismadb";
import { CustomError } from "@/lib/CustomError";
import { fetchRepositoryUtility } from "./fetchRepository.utility";


export const repositoryService = async (
  name: string,
  owner: string,
  repoName: string,
) => {
  const repo = await prisma.repository.findUnique({ where: { name } });

  try {
    const githubResponse = await fetchRepositoryUtility(owner, repoName, repo?.etag);

    const conditions = {
      stars: githubResponse.data.stargazers_count || 0,
      activity: 0, // Placeholder for future logic
      etag: githubResponse.headers.etag || null,
      details: JSON.stringify(githubResponse.data),
      lastUpdated: new Date(),
    };

    return await prisma.repository.upsert({
      where: { name },
      update: conditions,
      create: { name, repo_name: repoName, owner, ...conditions }
    });

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
