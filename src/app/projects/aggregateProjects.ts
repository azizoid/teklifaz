import fs from "fs";
import path from "path";

const projectsDir = path.join(process.cwd(), "data", "projects");
const outputFile = path.join(process.cwd(), "data", "all_projects.json");

const aggregateProjects = async () => {
  const developers = fs.readdirSync(projectsDir);
  const allProjects = [];

  for (const dev of developers) {
    const infoFile = path.join(projectsDir, dev, "info.json");
    if (fs.existsSync(infoFile)) {
      const data = JSON.parse(fs.readFileSync(infoFile, "utf-8"));

      for (const repository of data.repositories) {
        allProjects.push({
          developer: data.developer,
          provider: repository.provider,
          name: repository.name,
          tags: repository.tags,
          stars: repository.stars,
        });
      }
    }
  }

  // Write the flat array into all_projects.json
  fs.writeFileSync(outputFile, JSON.stringify(allProjects, null, 2));
  console.log(
    "All projects have been aggregated into all_projects.json as a flat array",
  );
};

export default aggregateProjects().catch((err) => console.error(err));
