import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { CustomError } from "@/lib/CustomError";
import { OwnerRepoParams } from "@/lib/github.types";
import { isRepoExists } from "@/utils/isRepoExists";
import { getOwnerRepoParam } from "@/utils/getOwnerRepoParam";
import { fetchRepo } from "@/servises/github/fetchRepo";
import { upsertRepository } from "@/servises/db/upsertRepository";
import { upsertEtag } from "@/utils/fetchWithEtag";
import { fetchContributors } from "@/servises/github/fetchContributors";
import { upsertContributors } from "@/servises/db/fetchContributors";

export const GET = async (
  _: NextRequest,
  ctx: { params: Promise<OwnerRepoParams> },
) => {
  const { owner, repoName, hash } = await getOwnerRepoParam(ctx);

  // 1. Check if the repo is in our allowed list
  if (!isRepoExists(hash)) {
    throw new CustomError(
      "This repository is not part of our community. To add this repo to the database, please follow the link.",
      400,
    );
  }

  // 2. See if the repo is already in the DB
  const existingRepo = await prisma.repository.findUnique({
    where: { name: hash },
  });

  try {
    // 3. Fetch Repo from GitHub
    const { repositoryData, repositoryHeaders, repoEndpoint } = await fetchRepo(
      {
        owner,
        repoName,
        existingRepo,
      },
    );

    // 4. Prepare fields for DB
    const repoConditions = {
      avatar_url: repositoryData.owner.avatar_url,
      description: repositoryData.description || "",
      stars: repositoryData.stargazers_count || 0,
      html_url: repositoryData.html_url,
    };

    // 5. Upsert the repository record
    const upsertedRepo = await upsertRepository(
      hash,
      repoName,
      owner,
      repoConditions,
    );

    // 6. Update or create the ETag for the repo
    await upsertEtag(repoEndpoint, repositoryHeaders.etag);

    // 7. If the repo is upserted, handle contributors
    if (upsertedRepo) {
      const existingContributors = await prisma.contributors.findUnique({
        where: { repository_id: upsertedRepo.id },
      });

      try {
        // 8. Fetch contributors
        const { contributorsData, contributionsHeaders, contributorsEndpoint } =
          await fetchContributors({ owner, repoName, existingContributors });

        await upsertContributors(upsertedRepo.id, contributorsData);

        // 10. Update or create the ETag for the contributors
        await upsertEtag(contributorsEndpoint, contributionsHeaders.etag);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.status === 304) {
          // If not modified, return existing contributors
          return NextResponse.json(existingContributors, { status: 200 });
        }
        throw error;
      }
    }

    return NextResponse.json(upsertedRepo, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 304) {
      // If not modified, return existing repo
      return NextResponse.json(existingRepo, { status: 200 });
    }
    throw error;
  }
};
