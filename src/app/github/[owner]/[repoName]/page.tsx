'use client';

import { fetcher } from '@/utils/fetcher';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useMemo, useState } from "react";
import { Contributor } from "@/app/api/github/[owner]/[repoName]/contributors/syncContributorsData";
import { RepoDetails as RepoDetialsModel, Repository } from "@prisma/client";
import { RepoView } from "./RepoView";

export default function RepoDetails() {

  const { owner, repoName } = useParams();

  const [contributors, setContributors] = useState<Contributor[]>([]);

  const {
    data: repoData,
    isLoading: repoLoading
  } = useSWR<Repository>(
    `/api/github/${owner}/${repoName}`,
    fetcher
  );

  const {
    isLoading: contributorsLoading
  } = useSWR<RepoDetialsModel>(
    `/api/github/${owner}/${repoName}/contributors`,
    fetcher,
    {
      onSuccess: (data) => {
        const contributorsParsed = JSON.parse(data?.contributors?.toString() || '[]') as Contributor[];
        const contributorsTemp = contributorsParsed.map(({ login, avatar_url, html_url, contributions }) => ({
          login,
          avatar_url,
          html_url,
          contributions,
        }))
          .sort((a, b) => b.contributions - a.contributions);
        setContributors(contributorsTemp);
      }
    }
  );

  const totalActivity = useMemo(() => contributors.reduce(
    (acc, curr) => acc + curr.contributions,
    0,
  ), [contributors])

  if (repoLoading || contributorsLoading) {
    return <div>Loading...</div>
  }

  if (repoData) {
    return <RepoView repoData={repoData} contributors={contributors} totalActivity={totalActivity} />
  }

  return <div>Error...</div>
}