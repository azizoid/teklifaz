'use client'
import { useEffect, useMemo, useState } from 'react';

import axios from 'axios';

import { Repo, RepositoryProps } from '@/components/Repo/Repo';
import data from '@/data/dump.json';

interface GithubResponseProps {
  name: string;
  description: string;
  stargazers_count: number;
  full_name:string;
  svn_url: string;
  subscribers_count:number
}

const fetchRepositoryStars = async (
  username: string, repo: string
) => (await axios.get<GithubResponseProps>(`https://api.github.com/repos/${username}/${repo}`)).data

const Home = () => {
  const [repos, setRepos] = useState<RepositoryProps[]>([])

  const repoGroups = useMemo(() => [
    repos.slice(0, 3),
    repos.slice(3),
  ], [repos])

  useEffect(() => {
    const fetchData = (async () => {
      try {
        const responses = await Promise.all(data.map(item => fetchRepositoryStars(item.username, item.repo)))

        const allRepos: RepositoryProps[] = responses.map(({name, stargazers_count, full_name, svn_url, description, subscribers_count}) => ({
          name,
          description,
          stars: stargazers_count,
          fullname: full_name,
          url: svn_url,
          subscribersCount: subscribers_count
        }))

        // Sort by star count
        const sortedRepos = allRepos.sort((a, b) => b.stars - a.stars)
        setRepos(sortedRepos)
      } catch (error) {
        console.error(error)
      }
    })

    fetchData()
  }, [])

  return (
    <>
      {repoGroups.map((group, index) => (
        <div className={`w-full grid grid-cols-${index === 0 ? 3 : 4} gap-4`} key={index}>
          {group.map(({ name, fullname, description, url, stars, subscribersCount }) => (
            <Repo
              key={name}
              stars={stars}
              fullname={fullname}
              url={url}
              subscribersCount={subscribersCount}
              name={name}
              description={description}
            />
          ))}
        </div>
      ))}
    </>
  )
}

export default Home
