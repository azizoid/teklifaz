import { NextRequest, NextResponse } from "next/server";
import { isRepoExists } from "@/utils/isRepoExists";
import { CustomError } from "@/lib/CustomError";
import { syncRepository } from "./syncRepository";
import { withTryCatch } from "@/utils/withTryCatch";
import { getOwnerRepoParam } from "@/utils/getOwnerRepoParam";

export const GET = withTryCatch(async (_req: NextRequest, ctx) => {
  const { owner, repoName, id } = await getOwnerRepoParam(ctx);

  if (!isRepoExists(id)) {
    throw new CustomError(
      "This repository is not part of our community. To add this repo to the database, please follow the link.",
      400
    );
  }

  const repo = await syncRepository(id, owner, repoName);

  return NextResponse.json(repo, { status: 200 });
});