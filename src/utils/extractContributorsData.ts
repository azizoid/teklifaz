import { Repository } from "@prisma/client";

export interface ContributorProps {
  login?: string;
  avatar_url?: string;
  html_url?: string;
  contributions: number;
}

export const extractContributorsData = (data: Repository): ContributorProps[] => {
  const contributorsParsed = JSON.parse(data.contributors?.toString() || '[]') as ContributorProps[];
  const contributorsResult = contributorsParsed.map(({ login, avatar_url, html_url, contributions }) => ({
    login,
    avatar_url,
    html_url,
    contributions,
  })).sort((a, b) => b.contributions - a.contributions)

  return contributorsResult;
}