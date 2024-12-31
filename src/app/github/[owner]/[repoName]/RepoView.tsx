"use client";

import Link from "next/link";

import { FaStar, FaExternalLinkSquareAlt } from "react-icons/fa";

import { Repository } from "@prisma/client";
import { ContributorProps } from "@/lib/github.types";
import { ContributorsWidget } from "../../components/ContributorsWidget";
import { ContributorsBlock } from "../../components/ContributorsBlock";

type RepoViewProps = {
  repoData: Repository;
  contributors: ContributorProps[];
};

export const RepoView = ({ repoData, contributors }: RepoViewProps) => (
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
        <h2 className="text-3xl font-semibold">{repoData.activity}</h2>
        <p>from {contributors.length} contributors</p>
      </div>

      <div className="flex-1 flex flex-row justify-between items-center bg-teklif-200 hover:bg-teklif-300 text-primary-dark p-4">
        <ContributorsWidget contributors={contributors} />
      </div>
    </section>

    <section className="flex flex-row justify-between gap-4 mb-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Repository</h2>
        <Link
          href={repoData.html_url}
          className="bg-teklif-200 hover:bg-teklif-300 text-blue-600 text-lg inline-flex items-center gap-2 bg-gray-200 rounded p-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaExternalLinkSquareAlt /> {repoData.name}
        </Link>
      </div>

      <div className="w-full text-center">
        <h3 className="text-xl font-bold mb-4">Description</h3>
        <p>{repoData.description || "No description provided."}</p>
      </div>
    </section>

    <section className="w-full" id="contributorsSection">
      <h2 className="text-2xl font-bold mb-4">Contributors</h2>
      <ContributorsBlock contributors={contributors} />
    </section>
  </div>
);
