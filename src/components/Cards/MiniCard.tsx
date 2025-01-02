import Link from "next/link";
import { RepoCardProps } from "./Card.types";
import { StarIcon } from "lucide-react";

export const MiniCard = ({ repo }: RepoCardProps) => (
  <Link
    href={`/github/${repo.name}`}
    className="border-r border-b hover:bg-gray-50"
  >
    <div className="flex flex-row justify-between gap-2 p-4">
      <h5 className="text-gray-900">
        {repo.owner}/<span className="font-bold">{repo.repo_name}</span>
      </h5>
      <div className="flex items-center space-x-1">
        <StarIcon size="16" />
        <span className="">{repo.stars}</span>
      </div>
    </div>
  </Link>
);
