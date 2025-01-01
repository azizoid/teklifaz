import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { octokit } from "@/lib/octokit";
import { CustomError } from "@/lib/CustomError";
import { OwnerRepoParams } from "@/lib/github.types";
import { isRepoExists } from "@/utils/isRepoExists";
import { getOwnerRepoParam } from "@/utils/getOwnerRepoParam";
import { getEtag } from "@/utils/fetchWithEtag";

export const GET = async (_: NextRequest, ctx: { params: Promise<OwnerRepoParams> }) => {
  const { owner, repoName, hash } = await getOwnerRepoParam(ctx);

  if (!isRepoExists(hash)) {
    throw new CustomError(
      "This repository is not part of our community. To add this repo to the database, please follow the link.",
      400,
    );
  }

  // Get existingRepo if available
  const existingRepo = await prisma.repository.findUnique({ where: { name: hash } });

  // Prepare the single endpoints
  const repoEndpoint = octokit.repos.get.endpoint({ owner, repo: repoName }).url;
  const contributorsEndpoint = octokit.repos.listContributors.endpoint({ owner, repo: repoName }).url;

  // Fetch ETag if the repo is already in our db
  const etagRepository = existingRepo ? await getEtag(repoEndpoint) : undefined;

  try {
    // Attempt to fetch the repository data
    const { data: repositoryData, headers: repositoryHeaders } = await octokit.repos.get({
      owner,
      repo: repoName,
      ...(etagRepository && { headers: { "If-None-Match": etagRepository } }),
    });

    // Prepare fields for upsert
    const repoConditions = {
      avatar_url: repositoryData.owner.avatar_url,
      description: repositoryData.description || "",
      stars: repositoryData.stargazers_count || 0,
      html_url: repositoryData.html_url,
    };

    // Upsert the repository record
    const upsertedRepo = await prisma.repository.upsert({
      where: { name: hash },
      update: repoConditions,
      create: {
        name: hash,
        repo_name: repoName,
        owner,
        ...repoConditions,
      },
    });

    // Update or create the ETag for the repo
    const repoEtagConditions = {
      etag: repositoryHeaders.etag,
      href: repoEndpoint,
      lastUpdated: new Date(),
    };
    await prisma.etag.upsert({
      where: { href: repoEtagConditions.href },
      update: repoEtagConditions,
      create: repoEtagConditions,
    });

    // If the repository was successfully upserted, handle contributors
    if (upsertedRepo) {
      const existingContributors = await prisma.contributors.findUnique({
        where: { repository_id: upsertedRepo.id },
      });

      // Fetch ETag for contributors if already in db
      const etagContributors = existingContributors ? await getEtag(contributorsEndpoint) : undefined;

      try {
        // Attempt to fetch contributors data
        const { data: contributorsData, headers: contributionsHeaders } = await octokit.repos.listContributors({
          owner,
          repo: repoName,
          ...(etagContributors && { headers: { "If-None-Match": etagContributors } }),
        });

        // Sort contributors by number of contributions (descending)
        const contributorsOrdered = contributorsData
          .map(({ login, avatar_url, html_url, contributions }) => ({
            login,
            avatar_url,
            html_url,
            contributions,
          }))
          ?.sort((a, b) => b.contributions - a.contributions);

        // Upsert contributors
        const contributionsConditions = {
          repository_id: upsertedRepo.id,
          content: contributorsOrdered,
        };
        await prisma.contributors.upsert({
          where: { repository_id: upsertedRepo.id },
          update: contributionsConditions,
          create: contributionsConditions,
        });

        // Update or create the ETag for the contributors
        const contributorsEtagConditions = {
          etag: contributionsHeaders.etag,
          href: contributorsEndpoint,
          lastUpdated: new Date(),
        };
        await prisma.etag.upsert({
          where: { href: contributorsEndpoint },
          update: contributorsEtagConditions,
          create: contributorsEtagConditions,
        });
      } catch (error) {
        // If not modified, return existing contributors
        if ((error as any).status === 304) {
          return NextResponse.json(existingContributors, { status: 200 });
        }
        throw error;
      }
    }

    return NextResponse.json(upsertedRepo, { status: 200 });
  } catch (error) {
    // If not modified, return existing repo
    if ((error as any).status === 304) {
      return NextResponse.json(existingRepo, { status: 200 });
    }
    throw error;
  }
};