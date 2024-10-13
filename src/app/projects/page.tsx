import { getProjects } from "./getProjects";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Azeri Developer Projects</h1>
      {projects.map((project, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold">{project.developer}</h2>
          {project.repositories.map((repo, repoIndex) => (
            <div key={repoIndex}>
              <p>
                <strong>{repo.name}</strong> by {repo.owner}
              </p>
              <p>Tags: {repo.tags.join(', ')}</p>
              <p>Stars: {repo.stars}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}