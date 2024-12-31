import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RepoCardProps } from "./Card.types";
import { ActivityIcon, LinkIcon, StarIcon } from "lucide-react";

export const MidCard = ({ repo }: RepoCardProps) => (
  <Card>
    <CardHeader className="p-4 pb-2 text-sm">
      <CardTitle className="flex flex-row justify-between text-md">
        {repo.name}
        <Link href={`/github/${repo.name}`}>
          <LinkIcon size={16} />
        </Link>
      </CardTitle>
      <CardDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </CardDescription>
    </CardHeader>
    <CardFooter className="text-sm border-t p-0">
      <div className="flex-1 py-2 flex flex-row justify-center items-center gap-2 border-r">
        <StarIcon size={12} /> {repo.stars}
      </div>
      <div className="flex-1 py-2 flex flex-row justify-center items-center gap-2">
        <ActivityIcon size={12} /> {repo.activity}
      </div>
    </CardFooter>
  </Card>
);
