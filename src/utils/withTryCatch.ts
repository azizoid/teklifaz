import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/utils/handleError";
import { OwnerRepoParams } from "@/lib/github.types";

interface HandlerContext {
  params: Promise<OwnerRepoParams>;
}

type HandlerFn = (
  req: NextRequest,
  ctx: HandlerContext,
) => Promise<NextResponse>;

export const withTryCatch = (handler: HandlerFn): HandlerFn => {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      return handleError(error);
    }
  };
};
