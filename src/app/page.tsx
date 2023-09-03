import Image from 'next/image'

import data from '@/data/dump.json'

const Home = () =>{
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map(repo=>{
        return <div className="card-container" key={repo.name}>
            <p className="username">{repo.github}</p>
            <p className="repo-url-stars">{repo.url} | Stars</p>
            <p className="description">Description</p>
        </div>
        })}
    </div>
  )
}

export default Home