import { NextRequest, NextResponse } from "next/server";
import { isRepoExists } from "@/utils/isRepoExists";
import { CustomError } from "@/lib/CustomError";
import { repositoryService } from "./repository.service";
import { handleError } from "@/utils/handleError";

type Params = Promise<{ owner: string; repoName: string }>;

export const GET = async (_: NextRequest, res: { params: Params }) => {
  try {
    const { owner, repoName } = await res.params;

    const id = `${owner}/${repoName}`;

    // Biz, ancaq bizim icmanin bir hissesi olaran repo-lari yoxlayiriq
    if (!isRepoExists(id)) {
      throw new CustomError(
        "This repository is not part of our community. To add this repo to the database, please follow the link.",
        400,
      );
    }

    const repo = await repositoryService(id, owner, repoName);

    return NextResponse.json(repo, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
