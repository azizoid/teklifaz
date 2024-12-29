import { OwnerRepoParams } from "@/lib/github.types";

export const getOwnerRepoParam = async (
  ctx: { params: Promise<OwnerRepoParams> }
) => {
  const { owner, repoName } = await ctx.params;
  return {
    owner,
    repoName,
    id: `${owner}/${repoName}`,
  };
}