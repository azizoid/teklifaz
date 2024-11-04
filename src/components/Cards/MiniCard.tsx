import Link from "next/link";
import { RepoCardProps } from "./RepoCard.type";
import { CiStar } from "react-icons/ci";

export const MiniCard = ({ project }: RepoCardProps) => (
  <Link
    href={`/projects/${project.developer}/${project.name}`}
    className="border-r border-b border-gray-200 bg-white hover:bg-gray-50"
  >
    <div className="flex flex-row justify-between gap-2 p-4">
      <h5 className="text-gray-900">{project.developer}/<span className="font-bold">{project.name}</span></h5>
      <div className="flex items-center space-x-1">
        <CiStar size="16" />
        <span className="">{Math.round(Math.random() * 100)}</span>
      </div>
    </div>
  </Link>
)