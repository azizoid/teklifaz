import Image from "next/image";

import { ContributorProps } from "@/lib/github.types";
import Link from "next/link";

export const ContributorsBlock = ({
  contributors,
}: {
  contributors: ContributorProps[];
}) => (
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
);
