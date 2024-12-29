/*
  Warnings:

  - The primary key for the `RepoDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RepoDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[repositoryId]` on the table `RepoDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `repositoryId` to the `RepoDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RepoDetails" DROP CONSTRAINT "RepoDetails_id_fkey";

-- AlterTable
ALTER TABLE "RepoDetails" DROP CONSTRAINT "RepoDetails_pkey",
ADD COLUMN     "etag" TEXT,
ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "repositoryId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RepoDetails_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "RepoDetails_repositoryId_key" ON "RepoDetails"("repositoryId");

-- AddForeignKey
ALTER TABLE "RepoDetails" ADD CONSTRAINT "RepoDetails_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
