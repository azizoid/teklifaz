import Link from 'next/link'
import { CiStar } from "react-icons/ci";

import { getProjects } from "./getProjects";
import { TopCard } from '@/components/Cards/TopCard';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityIcon, LinkIcon, StarIcon, UsersIcon } from 'lucide-react';

export default async function ProjectsPage() {
  const projectsList = await getProjects();

  const top3Projects = projectsList.slice(0, 3);
  const midProjects = projectsList.slice(3, 7);
  const restProjects = projectsList.slice(7);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {
          top3Projects.map((project, index) => (
            <TopCard key={index} project={project} />
          ))
        }
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {
          midProjects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex flex-row justify-between">
                  {project.developer}
                  <Link href={`/projects/${project.developer}/${project.name}`}><LinkIcon /></Link>
                </CardTitle>
                <h5 className="text-xl text-gray-900 dark:text-white">{project.name}</h5>
              </CardHeader>
              <CardFooter className="text-sm border-t p-0">
                <div className='flex-1 py-4 flex flex-row justify-center items-center gap-2'>
                  <StarIcon size={12} /> 5
                </div>
                <div className='flex-1 border-x py-4 flex flex-row justify-center items-center gap-2'>
                  <UsersIcon size={12} /> 5
                </div>
                <div className='flex-1 py-4 flex flex-row justify-center items-center gap-2'>
                  <ActivityIcon size={12} /> 5
                </div>
              </CardFooter>
            </Card>
          ))
        }
      </div>

      <div className="grid grid-cols-3 border-t border-l mt-8">
        {
          restProjects.map((project, index) => (
            <Link key={index}
              href={`/projects/${project.developer}/${project.name}`}
              className="border-r border-b border-gray-200 bg-white hover:bg-gray-50"
            >
              <div className="flex flex-row justify-between gap-2 p-4">
                <h5 className="text-gray-900">{project.developer}/{project.name}</h5>
                <div className="flex items-center space-x-1">
                  <CiStar size="16" />
                  <span className="">{Math.round(Math.random() * 100)}</span>

                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div >
  );
}