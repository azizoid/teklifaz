import Image from "next/image";

import { ContributorProps } from "@/lib/github.types";

export const ContributorsWidget = ({ contributors }: { contributors: ContributorProps[] }) => (
  <>
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-2">
        <span className="text-3xl font-bold text-gray-700">
          {contributors.length}
        </span>
      </div>
      <p>Contributors</p>
    </div>

    <div className="flex -space-x-4 rtl:space-x-reverse">
      {contributors.slice(0, 3).map((c) => (
        <Image
          key={c.login}
          className="w-12 h-12 bg-white rounded-full border-2 border-white"
          src={c.avatar_url || ""}
          alt={c.login}
          width={64}
          height={64}
        />
      ))}

      {contributors.length > 3 && (
        <a
          className="flex items-center justify-center w-12 h-12 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
          href="#contributorsSection"
        >
          +{contributors.length - 3}
        </a>
      )}
    </div>
  </>
);