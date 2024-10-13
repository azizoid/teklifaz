import path from 'path';
import fs from 'fs';

type Project = {
  developer: string;
  repositories: Array<{
    provider: string;
    owner: string;
    name: string;
    tags: string[];
    stars: number;
  }>;
};

export const getProjects = async (): Promise<Project[]> => {
  const dataPath = path.join(process.cwd(), 'data', 'all_projects.json');
  const fileContents = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(fileContents);
};