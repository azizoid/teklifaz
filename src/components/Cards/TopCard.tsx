import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ActivityIcon, StarIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { RepoCardProps } from "./RepoCard.type";

export const TopCard = ({ project }: RepoCardProps) => (
  <Card>
    <Link
      href={`/projects/${project.developer}/${project.name}`}
      className="flex flex-col h-full justify-between hover:bg-gray-50"
    >
      <CardHeader className="flex w-full flex-row gap-4 pt-0">
        <Avatar className="w-16 h-16 flex-shrink-0">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/47358"
            width={16}
            height={16}
            className="object-cover rounded-b-xl w-full h-full"
          />
          <AvatarFallback>{project.developer.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="grow">
          <CardDescription>{project.developer}</CardDescription>
          <CardTitle className="text-xl">{project.name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="grow content-end">
        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</CardDescription>
      </CardContent>

      <CardFooter className="text-sm text-center border-t pb-0">
        <div className='grow py-4 flex flex-row justify-evenly'>
          Stars
          <div className="flex flex-row gap-2 items-center">
            <StarIcon size={12} /> 5
          </div>
        </div>

        <div className='grow border-x py-4 flex flex-row justify-evenly'>
          Contributors
          <div className="flex flex-row gap-2 items-center">
            <UsersIcon size={12} /> 5
          </div>
        </div>

        <div className='grow py-4 flex flex-row justify-evenly'>
          Activity
          <div className="flex flex-row gap-2 items-center">
            <ActivityIcon size={12} /> 5
          </div>
        </div>
      </CardFooter>
    </Link>
  </Card >
)