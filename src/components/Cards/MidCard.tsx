import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RepoCardProps } from "./RepoCard.type";
import { ActivityIcon, LinkIcon, StarIcon, UsersIcon } from "lucide-react";

export const MidCard = ({ project }: RepoCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex flex-row justify-between">
        {project.name}
        <Link href={`/projects/${project.developer}/${project.name}`}>
          <LinkIcon />
        </Link>
      </CardTitle>
      <CardDescription>{project.developer}</CardDescription>
    </CardHeader>
    <CardFooter className="text-sm border-t p-0">
      <div className="flex-1 py-4 flex flex-row justify-center items-center gap-2">
        <StarIcon size={12} /> 5
      </div>
      <div className="flex-1 border-x py-4 flex flex-row justify-center items-center gap-2">
        <UsersIcon size={12} /> 5
      </div>
      <div className="flex-1 py-4 flex flex-row justify-center items-center gap-2">
        <ActivityIcon size={12} /> 5
      </div>
    </CardFooter>
  </Card>
);
