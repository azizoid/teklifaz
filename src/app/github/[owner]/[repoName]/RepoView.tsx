'use client';

import Link from "next/link";
import Image from "next/image";

import { FaStar, FaExternalLinkSquareAlt } from "react-icons/fa";
import { Contributor } from "@/app/api/github/[owner]/[repoName]/contributors/syncContributorsData";
import { Repository } from "@prisma/client";


type RepoViewProps = {
  repoData: Repository;
  contributors: Contributor[];
  totalActivity: number;
}

export const RepoView = ({ repoData, contributors, totalActivity }: RepoViewProps) => {


  return (
    <div className="min-h-screen flex flex-col  p-6">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">{repoData.name}</h1>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
        <div className="flex flex-col items-center content-center bg-teklif-200 hover:bg-teklif-300 text-primary-dark p-4">
          <p>Total Stars</p>
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-semibold">{repoData.stars}</h2>
            <FaStar size="24" />
          </div>
        </div>

        <div className="flex flex-col items-center bg-teklif-200 hover:bg-teklif-300 text-primary-dark  p-4">
          <p>Total Activity</p>
          <h2 className="text-3xl font-semibold">{totalActivity}</h2>
          <p>from {contributors.length} contributors</p>
        </div>

        <div className="flex-1 flex flex-row justify-between items-center bg-teklif-200 hover:bg-teklif-300 text-primary-dark p-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gray-700">
                {contributors.length}
              </span>
            </div>
            <p>Contributors</p>
          </div>
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {contributors.slice(0, 3).map((c) => {
              return (
                <Image
                  key={c.login}
                  className="w-12 h-12 bg-white rounded-full border-2 border-white"
                  src={c.avatar_url || ""}
                  alt=""
                  width={64}
                  height={64}
                />
              );
            })}
            <a
              className="flex items-center justify-center w-12 h-12 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
              href="#contributorsSection"
            >
              +99
            </a>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Repository</h2>
        <Link
          href={repoData.html_url}
          className="bg-teklif-200 hover:bg-teklif-300 text-blue-600 text-lg inline-flex items-center gap-2 bg-gray-200 rounded p-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaExternalLinkSquareAlt /> {repoData.name}
        </Link>
      </section>

      <section className="w-full" id="contributorsSection">
        <h2 className="text-2xl font-bold mb-4">Contributors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {contributors.map((contributor, index) => (
            <Link
              href={contributor.html_url || ""}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 shadow-lg hover:bg-teklif-50 "
            >
              <Image
                key={contributor.login}
                className="w-18 h-18 bg-white rounded-full border-2 border-white mb-2"
                src={contributor.avatar_url || ""}
                alt=""
                width={64}
                height={64}
              />
              <p className="text-center">{contributor.login}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}