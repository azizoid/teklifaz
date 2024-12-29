-- CreateTable
CREATE TABLE "RepoDetails" (
    "id" TEXT NOT NULL,
    "contributors" JSONB NOT NULL,

    CONSTRAINT "RepoDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RepoDetails" ADD CONSTRAINT "RepoDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "Repository"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
