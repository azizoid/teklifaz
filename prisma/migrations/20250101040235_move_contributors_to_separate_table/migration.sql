/*
  Warnings:

  - You are about to drop the column `contributors` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `etag` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `Repository` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "contributors",
DROP COLUMN "etag",
DROP COLUMN "lastUpdated",
ALTER COLUMN "activity" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Contributors" (
    "id" SERIAL NOT NULL,
    "repository_id" INTEGER NOT NULL,
    "content" JSONB[],

    CONSTRAINT "Contributors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contributors_repository_id_key" ON "Contributors"("repository_id");
