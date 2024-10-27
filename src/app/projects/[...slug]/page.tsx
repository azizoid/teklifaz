import { components } from "@octokit/openapi-types";

import { fetchFromGitHubWithETag } from "@/utils/fetchFromGithub";
import Link from "next/link";
import { Alert, Avatar, Card } from "flowbite-react";
import { FaStar, FaExternalLinkSquareAlt } from "react-icons/fa";

type RepoProps = components["schemas"]["full-repository"];
type ContributorsProps = components["schemas"]["contributor"];

const ProjectsPage = async (
    { params }: { params: Promise<{ slug: string }> }) => {

    const [slugDev, slugRepo] = (await params).slug

    const repo = await fetchFromGitHubWithETag<RepoProps>(`repos/${slugDev}/${slugRepo}`)
    const contributorsRaw = await fetchFromGitHubWithETag<ContributorsProps[]>(`repos/${slugDev}/${slugRepo}/contributors`)

    const {
        name,
        full_name,
        html_url,
        description,
        collaborators_url,
        pushed_at,
        stargazers_count,
        watchers_count,
        language,
        topics
    } = repo

    const contributors = contributorsRaw.map(({
        login, avatar_url, html_url, contributions
    }) => ({
        login, avatar_url, html_url, contributions
    })).sort((a, b) => b.contributions - a.contributions)

    const totalActivity = contributors.reduce((acc, curr) => acc + curr.contributions, 0)

    return (
        <div className="min-h-screen flex flex-col  p-6">
            <header className="text-center py-6">
                <h1 className="text-4xl font-bold">{name}</h1>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
                <div className="flex flex-col space-between bg-teklif-200 hover:bg-teklif-300 text-primary-dark rounded-lg p-4">
                    <p>Total Stars</p>
                    <div className="flex flex-row items-center space-x-4">
                        <h2 className="text-3xl font-semibold">{stargazers_count}</h2>
                        <FaStar size="24" />
                    </div>
                </div>

                <div className="flex flex-col items-start bg-teklif-200 hover:bg-teklif-300 text-primary-dark rounded-lg p-4">
                    <p>Total Activity</p>
                    <h2 className="text-3xl font-semibold">{totalActivity}</h2>
                    <p>from {contributors.length} contributors</p>
                </div>

                <div className="flex-1 flex flex-row justify-between items-center bg-teklif-200 hover:bg-teklif-300 text-primary-dark rounded-lg p-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl font-bold text-gray-700">{contributors.length}</span>
                        </div>
                        <p>Contributors</p>
                    </div>
                    <Avatar.Group className="-space-x-8">
                        {contributors.slice(0, 3).map(c =>
                            <div className="relative">
                                <div className="absolute inset-0 bg-white rounded-full" />
                                <Avatar
                                    key={c.login}
                                    img={c.avatar_url}
                                    size="lg"
                                    color="pink"
                                    rounded
                                    bordered
                                    stacked
                                />
                            </div>
                        )}
                    </Avatar.Group>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Repository</h2>
                <Link
                    href={html_url}
                    className="bg-teklif-200 hover:bg-teklif-300 text-blue-600 text-lg inline-flex items-center gap-2 bg-gray-200 rounded p-4"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaExternalLinkSquareAlt /> {full_name}
                </Link>
            </section>

            <section className="w-full">
                <h2 className="text-2xl font-bold mb-4">Contributors</h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {contributors.map((contributor, index) => (
                        <Link
                            href={contributor.html_url || ''}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center p-4 shadow-lg hover:bg-teklif-50 "
                        >
                            <Avatar img={contributor.avatar_url} size="lg" className="mb-2" />
                            <p className="text-center">{contributor.login}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ProjectsPage