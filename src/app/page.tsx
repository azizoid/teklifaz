'use client'
import { useEffect, useState } from 'react';

import axios from 'axios';

import data from '@/data/dump.json';

type BaseGitRepoProps = {
  name: string;
  description: string;
  username: string;
}

interface RepositoryProps extends BaseGitRepoProps{
  stars: number;
  fullname:string;
  url: string;
  subscribersCount:number
}

interface GithubResponseProps extends BaseGitRepoProps{
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

  useEffect(() => {
    const fetchData = (async () => {
      try {
        const responses = await Promise.all(data.map(item => fetchRepositoryStars(item.username, item.repo)))

        const allRepos: RepositoryProps[] = responses.map(({name, stargazers_count, full_name, username, svn_url, description, subscribers_count}) => ({
          name,
          username,
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
    <div className="grid grid-cols-3 gap-4">
      {repos.map(({name, fullname, description, url, stars, subscribersCount}) => (
        <div className="p-4 bg-white rounded shadow-lg" key={name}>
            <p className="font-bold mb-2">{description}</p>
            <p className="text-blue-500 underline mb-2"><a href={url} target="_blank">{fullname}</a></p>
            <p className="text-lg">{stars} ulduz | dəstək ol{subscribersCount}</p>
          </div>
        )
      )}
    </div>
  )
}

export default Home
