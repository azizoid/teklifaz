import { prisma } from '@/lib/prismadb';
import { fetchGitHubContributors } from '@/utils/fetchGithubContributors';
import { CustomError } from '@/lib/CustomError';

export interface Contributor {
  login?: string;
  avatar_url?: string;
  html_url?: string;
  contributions: number;
}

export const fetchContributors = async (
  id: number,
  owner: string,
  repoName: string) => {

  const repoDetails = await prisma.repoDetails.findUnique({
    where: { repositoryId: id },
  });
  const etag = repoDetails?.etag || null;

  try {
    const { data: contributorsData, headers } = await fetchGitHubContributors(owner, repoName, etag);

    const contributors = contributorsData.map(contributor => ({
      login: contributor.login,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      contributions: contributor.contributions,
    }))

    const conditions = {
      contributors: JSON.stringify(contributors),
      etag: headers.etag || null,
      lastUpdated: new Date()
    }

    return await prisma.repoDetails.upsert({
      where: { repositoryId: id },
      update: conditions,
      create: {
        repositoryId: id,
        ...conditions,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 304) {
      console.log(
        "304 Not Modified. Returning existing repository from the database.",
      );
      if (repoDetails) {
        return repoDetails;
      }

      // Super edge case, have no idea how it is possible
      throw new CustomError(
        "Weird! No changes detected, but repository not found in the database. ",
        500,
      );
    }
    throw error;
  };
}