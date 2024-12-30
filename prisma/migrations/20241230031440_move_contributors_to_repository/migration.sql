/*
  Warnings:

  - You are about to drop the `RepoDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contributors` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RepoDetails" DROP CONSTRAINT "RepoDetails_repositoryId_fkey";

-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "contributors" JSONB NOT NULL;

-- DropTable
DROP TABLE "RepoDetails";
