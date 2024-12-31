"use client";

import useSWR from "swr";
import { MidCard } from "../Cards/MidCard";
import { fetcher } from "@/utils/fetcher";
import { Repository } from "@prisma/client";

export const Sidebar = () => {
  const { data: githubRepositories, error } = useSWR<Repository[]>(
    "/api/github",
    fetcher,
  );

  if (error) {
    return <div>Error loading repositories.</div>;
  }

  if (!githubRepositories) {
    return <div>Loading...</div>;
  }

  if (githubRepositories.length === 0) {
    return <div>No repositories found.</div>;
  }

  return (
    <>
      {githubRepositories.map((repo, index) => (
        <MidCard repo={repo} key={index} />
      ))}
    </>
  );
};
