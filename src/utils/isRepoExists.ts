import allProjects from '../../data/all_projects.json';

export const communityMap = new Map<string, { developer: string; provider: string; name: string }>(
  allProjects.map((p) => [p.id, { developer: p.developer, provider: p.provider, name: p.name }])
);

export const isRepoExists = (repo: string) => communityMap.has(repo);