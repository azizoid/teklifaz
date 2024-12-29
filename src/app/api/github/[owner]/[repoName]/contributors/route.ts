import { NextRequest, NextResponse } from "next/server";
import { withTryCatch } from "@/utils/withTryCatch";
import { getOwnerRepoParam } from "@/utils/getOwnerRepoParam";
import { syncContributors } from "./syncContributors";
import { isRepoInDb } from "@/utils/isRepoInDb";

export const GET = withTryCatch(async (_req: NextRequest, ctx) => {
  const { owner, repoName } = await getOwnerRepoParam(ctx);

  const repo = await isRepoInDb(owner, repoName);

  const contributors = await syncContributors(
    repo.id,
    repo.owner,
    repo.repo_name,
  );

  return NextResponse.json(contributors, { status: 200 });
});
