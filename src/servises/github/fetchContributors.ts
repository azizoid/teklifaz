import { octokit } from "@/lib/octokit";
import { getEtag } from "@/utils/fetchWithEtag";
import { Contributors } from "@prisma/client";

// interface ContributorItem {
//   login: string;
//   avatar_url: string;
//   html_url: string;
//   contributions: number;
// }

interface FetchContributorsParams {
  owner: string;
  repoName: string;
  existingContributors: Contributors | null;
}

export const fetchContributors = async ({
  owner,
  repoName,
  existingContributors,
}: FetchContributorsParams) => {
  const contributorsEndpoint = octokit.repos.listContributors.endpoint({
    owner,
    repo: repoName,
  }).url;

  const etagContributors = existingContributors
    ? await getEtag(contributorsEndpoint)
    : undefined;

  const { data, headers } = await octokit.repos.listContributors({
    owner,
    repo: repoName,
    ...(etagContributors && { headers: { "If-None-Match": etagContributors } }),
  });

  const contributorsData = data
    .map(({ login, avatar_url, html_url, contributions }) => ({
      login,
      avatar_url,
      html_url,
      contributions,
    }))
    .sort((a, b) => b.contributions - a.contributions);

  return {
    contributorsData,
    contributionsHeaders: headers,
    contributorsEndpoint,
  };
};
