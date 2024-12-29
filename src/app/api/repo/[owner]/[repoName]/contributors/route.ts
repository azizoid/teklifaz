import { NextRequest, NextResponse } from 'next/server';
import { fetchContributors } from './contributors.service';
import { handleError } from '@/utils/handleError';
import { isRepoInDb } from '@/utils/isRepoInDb';

type Params = Promise<{ owner: string, repoName: string }>;

export const GET = async (_: NextRequest, res: { params: Params }) => {
  try {
    const { owner, repoName } = await res.params;

    const repo = await isRepoInDb(owner, repoName)

    const contributors = await fetchContributors(repo.id, repo.owner, repo.repo_name);

    // await updateContributors(repo.id, contributors, newEtag);

    return NextResponse.json(contributors, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};