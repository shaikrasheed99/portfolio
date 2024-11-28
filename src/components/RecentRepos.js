import React, { useEffect, useState } from "react";
import "./RecentRepos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCodeFork, faClock, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const formatUpdatedTime = (updatedAt) => {
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const diffInMinutes = Math.floor((now - updatedDate) / 60000);

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} hours ago`;
    } else if (diffInMinutes < 10080) {
        const days = Math.floor(diffInMinutes / 1440);
        return `${days} days ago`;
    } else if (diffInMinutes < 43200) {
        const weeks = Math.floor(diffInMinutes / 10080);
        return `${weeks} weeks ago`;
    } else if (diffInMinutes < 259200) {
        const months = Math.floor(diffInMinutes / 43200);
        return `${months} months ago`;
    } else {
        return updatedDate.toLocaleDateString();
    }
};

function RecentRepos({ username }) {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=4`
                );
                const repoData = await response.json();

                const enrichedRepos = await Promise.all(
                    repoData.map(async (repo) => {
                        const commitsResponse = await fetch(
                            `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`
                        );
                        const commitsData = await commitsResponse.json();

                        const recentCommitDate = commitsData[0]?.commit?.committer?.date;

                        const linkHeader = commitsResponse.headers.get("Link");
                        const totalCommits = linkHeader
                            ? parseInt(linkHeader.match(/page=(\d+)>; rel="last"/)?.[1] || 1)
                            : 1;

                        return {
                            name: repo.name,
                            description: repo.description || "No description provided",
                            stars: repo.stargazers_count,
                            forks: repo.forks_count,
                            language: repo.language,
                            html_url: repo.html_url,
                            updated_at: recentCommitDate,
                            commitCount: totalCommits,
                        };
                    })
                );

                setRepos(enrichedRepos);
            } catch (error) {
                console.error("Error fetching repos:", error);
            }
        };

        fetchRepos();
    }, [username]);

    return (
        <div className="recent-repos">
            <h3>Recently Updated Repositories</h3>
            <div className="repos-list">
                {repos.map((repo, index) => (
                    <div className="repo-card" key={index}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-name">
                            <FontAwesomeIcon icon={faGithub} className="repo-name-icon" />
                            {repo.name}
                        </a>
                        <p className="repo-description">{repo.description}</p>
                        <div className="repo-footer">
                            <span className="repo-stat">
                                <FontAwesomeIcon icon={faClock} /> {formatUpdatedTime(repo.updated_at)}
                            </span>
                            {repo.commitCount > 0 && (
                                <span className="repo-stat">
                                    <FontAwesomeIcon icon={faCodeBranch} /> {repo.commitCount} commits
                                </span>
                            )}
                            {repo.language && <span className="repo-language">{repo.language}</span>}
                            {repo.stars > 0 && (
                                <span className="repo-stat">
                                    <FontAwesomeIcon icon={faStar} /> {repo.stars}
                                </span>
                            )}
                            {repo.forks > 0 && (
                                <span className="repo-stat">
                                    <FontAwesomeIcon icon={faCodeFork} /> {repo.forks}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentRepos;
