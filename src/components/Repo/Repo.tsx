import { Button } from '../Button/Button';

export interface RepositoryProps {
  name: string;
  description: string;
  stars: number;
  fullname:string;
  url: string;
  subscribersCount:number
}

export const Repo = ({fullname, description, url, stars, subscribersCount}: RepositoryProps) =>
  <div className="p-4 bg-white rounded shadow-lg">
    <p className="text-gray-600 font-bold">{description}</p>
    <p className="text-blue-500 underline mb-2"><a href={url} target="_blank">{fullname}</a></p>
    <div className="flex justify-start gap-1">
      <Button>{stars} ulduz</Button>
      <Button>dəstək ol ({subscribersCount})</Button>
    </div>
  </div>