import { getProjects } from "./getProjects";
import { RepoCard } from '@/components/RepoCard/RepoCard';

export default async function ProjectsPage() {
  const projectsList = await getProjects();

  const top3Projects = projectsList.slice(0, 3);
  const midProjects = projectsList.slice(3, 7);
  const minimalProjects = projectsList.slice(7);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {
          top3Projects.map((project, index) => (
            <RepoCard key={index} project={project} type="top" />
          ))
        }
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {
          midProjects.map((project, index) => (
            <RepoCard key={index} project={project} type="mid" />
          ))
        }
      </div>

      <div className="grid grid-cols-6 gap-4 mt-8">
        {
          minimalProjects.map((project, index) => (
            <RepoCard key={index} project={project} type="minimal" />
          ))
        }
      </div>
    </div >
  );
}