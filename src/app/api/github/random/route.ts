import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  const repositories = await prisma.repository.findMany({
    select: {
      name: true,
      stars: true,
      activity: true,
    },
  });

  const shuffled = repositories.sort(() => 0.5 - Math.random());
  const randomRepositories = shuffled.slice(0, 3);

  return NextResponse.json(randomRepositories);
};
