"use client";

import { fetcher } from "@/utils/fetcher";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";

import { Repository as RepositoryModel } from "@prisma/client";
import { RepoView } from "./RepoView";
import { ContributorProps } from "@/lib/github.types";
import { extractContributorsData } from "@/utils/extractContributorsData";

export default function RepoDetails() {
  const { owner, repoName } = useParams();

  const [contributors, setContributors] = useState<ContributorProps[]>([]);

  const { data: repoData, isLoading: repoLoading } = useSWR<RepositoryModel>(
    `/api/github/${owner}/${repoName}`,
    fetcher,
    {
      refreshInterval: 0,
      onSuccess: (data) => {
        const extractedData = extractContributorsData(data);
        setContributors(extractedData);
      },
    },
  );

  if (repoLoading) {
    return <div>Loading...</div>;
  }

  if (repoData) {
    return <RepoView repoData={repoData} contributors={contributors} />;
  }

  return <div>Error...</div>;
}
