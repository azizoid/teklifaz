-- CreateTable
CREATE TABLE "Etag" (
    "id" SERIAL NOT NULL,
    "href" TEXT NOT NULL,
    "etag" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Etag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Etag_href_key" ON "Etag"("href");
