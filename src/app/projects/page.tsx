import { TopCard } from "@/components/Cards/TopCard";
import { MiniCard } from "@/components/Cards/MiniCard";
import { prisma } from "@/lib/prismadb";

export default async function ProjectsPage() {
  const projectsList = await prisma.repository.findMany({
    orderBy: {
      stars: "desc",
    },
  });

  const top3Projects = projectsList.slice(0, 3);
  const restProjects = projectsList.slice(3);

  return (
    <div className="container mx-auto p-0 md:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {top3Projects.map((repo, index) => (
          <TopCard key={index} repo={repo} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l mt-8">
        {restProjects.map((repo, index) => (
          <MiniCard key={index} repo={repo} />
        ))}
      </div>
    </div>
  );
}
