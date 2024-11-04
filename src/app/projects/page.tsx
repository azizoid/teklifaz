import Link from 'next/link'
import { CiStar } from "react-icons/ci";

import { getProjects } from "./getProjects";
import { TopCard } from '@/components/Cards/TopCard';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityIcon, LinkIcon, StarIcon, UsersIcon } from 'lucide-react';
import { MidCard } from '@/components/Cards/MidCard';
import { MiniCard } from '@/components/Cards/MiniCard';

export default async function ProjectsPage() {
  const projectsList = await getProjects();

  const top3Projects = projectsList.slice(0, 3);
  const midProjects = projectsList.slice(3, 7);
  const restProjects = projectsList.slice(7);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {top3Projects.map((project, index) => (
          <TopCard key={index} project={project} />
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {midProjects.map((project, index) => (
          <MidCard key={index} project={project} />
        ))}
      </div>

      <div className="grid grid-cols-3 border-t border-l mt-8">
        {restProjects.map((project, index) => (
          <MiniCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}