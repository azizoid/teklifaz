import path from 'path';
import fs from 'fs';

export type ProjectProps = {
  developer: string;
  provider: string;
  name: string;
  tags: string[];
  stars: number;
};

export const getProjects = async (): Promise<ProjectProps[]> => {
  const dataPath = path.join(process.cwd(), 'data', 'all_projects.json');
  const fileContents = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(fileContents);
};