/*
  Warnings:

  - Added the required column `html_url` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "html_url" TEXT NOT NULL;
