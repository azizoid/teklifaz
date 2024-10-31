import Link from 'next/link'
import { CiStar } from "react-icons/ci";

import { getProjects } from "./getProjects";

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
            <Link key={index}
              href={`/projects/${project.developer}/${project.name}`}
              className="flex flex-col justify-between border border-gray-200 rounded-lg shadow bg-white hover:bg-gray-50"
            >
              <div className="flex flex-col justify-start gap-2 p-4">
                <h5 className="text-xl text-gray-900 dark:text-white">{project.developer}</h5>
                <h6 className="text-l font-bold tracking-tight text-gray-900 dark:text-white">{project.name}</h6>
                <p className="font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
              </div>
              <div className="mt-auto flex flex-row w-full text-sm text-center border-t">
                <div className='flex-1 py-4'>Stars 5</div>
                <div className='flex-1 border-x py-4'>Contributors 3</div>x
                <div className='flex-1 py-4'>Activity 1</div>
              </div>
            </Link>
          ))
        }
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {
          midProjects.map((project, index) => (
            <Link key={index}
              href={`/projects/${project.developer}/${project.name}`}
              className="flex flex-col justify-between border border-gray-200 rounded-lg shadow bg-white hover:bg-gray-50"
            >
              <div className="flex flex-col justify-start gap-2 p-4">
                <h5 className="text-xl text-gray-900 dark:text-white">{project.developer}</h5>
                <h6 className="text-l font-bold tracking-tight text-gray-900 dark:text-white">{project.name}</h6>
              </div>
            </Link>
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