import React from 'react';

import { Card } from 'flowbite-react';
import { ProjectProps } from '@/app/projects/getProjects';

interface Repository {
  provider: string;
  owner: string;
  name: string;
  tags: string[];
  stars: number;
}

interface RepoCardProps {
  project: ProjectProps;
  type: 'top' | 'mid' | 'minimal';
}
export const RepoCard: React.FC<RepoCardProps> = ({ project, type }) => {
  return (
    <Card className={`card-${type}`}>
      <h5 className={`text-xl font-bold ${type === 'minimal' ? 'text-base' : 'text-xl'}`}>
        {project.name}
      </h5>

      <p className="text-sm font-light">⭐ {project.stars}</p>

      {(type === 'top' || type === 'mid') && (
        <p className="text-sm">Owner: {project.developer}</p>
      )}

      {type === 'top' && project.tags.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-light">Tags: {project.tags.join(', ')}</p>
        </div>
      )}

      {type === 'top' && (
        <p className="mt-3 text-sm text-gray-500">
          Detailed project description or additional info.
        </p>
      )}
    </Card>
  );
};