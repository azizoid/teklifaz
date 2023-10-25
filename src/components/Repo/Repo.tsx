import { useState } from 'react';

import { Button } from '../Button/Button';

export interface RepositoryProps {
  name: string;
  description: string;
  stars: number;
  fullname:string;
  url: string;
  subscribersCount:number
}

export const Repo = ({fullname, description, url, stars, subscribersCount}: RepositoryProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-4 bg-white rounded shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="text-gray-600 font-bold">{description}</p>
      <p className="text-blue-500 underline my-2"><a href={url} target="_blank">{fullname}</a></p>
      <div className="flex justify-start gap-1">
        <Button type={isHovered ? 'button' : 'text'}>{stars} ulduz</Button>
        <Button type={isHovered ? 'button' : 'text'}>dəstək ol ({subscribersCount})</Button>
      </div>
    </div>
  )
}