export type OwnerRepoParams = { owner: string; repoName: string };

export interface ContributorProps {
  login: string;
  avatar_url?: string;
  html_url: string;
  contributions: number;
}
