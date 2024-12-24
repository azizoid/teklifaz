import { getProjects } from "./getProjects";
import { TopCard } from "@/components/Cards/TopCard";
import { MiniCard } from "@/components/Cards/MiniCard";

export default async function ProjectsPage() {
  const projectsList = await getProjects();

  const top3Projects = projectsList.slice(0, 6);
  const restProjects = projectsList.slice(6);

  return (
    <div className="container mx-auto p-0 md:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {top3Projects.map((project, index) => (
          <TopCard key={index} project={project} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l mt-8">
        {restProjects.map((project, index) => (
          <MiniCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
