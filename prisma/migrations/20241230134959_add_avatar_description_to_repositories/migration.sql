/*
  Warnings:

  - Added the required column `avatar_url` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "avatar_url" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
