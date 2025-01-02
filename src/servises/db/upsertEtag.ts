import { prisma } from "@/lib/prismadb";

export const upsertEtag = async (etag: string, href: string) => {
  const etagData = {
    etag,
    href,
    lastUpdated: new Date(),
  };

  return prisma.etag.upsert({
    where: { href },
    update: etagData,
    create: etagData,
  });
};
