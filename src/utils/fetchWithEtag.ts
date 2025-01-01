import { prisma } from "@/lib/prismadb";

export interface GitHubRequest {
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData: (etag?: string | null) => Promise<any>;
}

const getEtag = async (href: string): Promise<string | null> => {
  const etagRecord = await prisma.etag.findUnique({
    where: { href },
  });

  return etagRecord?.etag || null;
};

const upsertEtag = async (href: string, etag: string | null) => {
  const lastUpdated = new Date();
  await prisma.etag.upsert({
    where: { href },
    update: { etag, lastUpdated },
    create: {
      href,
      etag,
      lastUpdated,
    },
  });
};

export const fetchWithEtag = async <T>(request: GitHubRequest): Promise<T> => {
  const etag = await getEtag(request.href);
  const response = await request.fetchData(etag);
  await upsertEtag(request.href, response.headers.etag || null);
  return response.data;
};