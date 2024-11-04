import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ActivityIcon, LinkIcon, StarIcon, UsersIcon } from "lucide-react";
import { ProjectProps } from "@/app/projects/getProjects";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type TopCardProps = {
  project: ProjectProps
}
export const TopCard = ({ project }: TopCardProps) => (
  <Card className="flex flex-col justify-between">
    <CardHeader className="w-full flex flex-row gap-4">
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/47358" width={64} height={64} />
        <AvatarFallback>{project.developer.substring(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col justify-items-start grow">
        <CardTitle className="flex flex-col">
          {project.developer}
        </CardTitle>

      </div>

      <Link href={`/projects/${project.developer}/${project.name}`}>
        <LinkIcon />
      </Link>
    </CardHeader>

    <CardContent className="align-text-bottom">
      <h1 className="text-xl text-gray-900">{project.name}</h1>
      <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</CardDescription>
    </CardContent>
    <CardFooter className="text-sm text-center border-t pb-0">
      <div className='flex-1 py-4 flex flex-row justify-evenly'>
        Stars
        <div className="flex flex-row gap-2 items-center">
          <StarIcon size={12} /> 5
        </div>
      </div>
      <div className='flex-1 border-x py-4 flex flex-row justify-evenly'>
        Contributors
        <div className="flex flex-row gap-2 items-center">
          <UsersIcon size={12} /> 5
        </div>
      </div>
      <div className='flex-1 py-4 flex flex-row justify-evenly'>
        Activity
        <div className="flex flex-row gap-2 items-center">
          <ActivityIcon size={12} /> 5
        </div>
      </div>
    </CardFooter>
  </Card>
)