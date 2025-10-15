// /api/github-data.ts

import type { VercelRequest, VercelResponse } from "@vercel/node";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "CarolGonzaga";

const headers = {
    Authorization: `bearer ${GITHUB_TOKEN}`,
    "User-Agent": "CarolGonzaga-Portfolio-API",
};

const graphqlQuery = {
    query: `
      query($username: String!) {
        user(login: $username) {
          id
          publicRepos: repositories(isFork: false, privacy: PUBLIC) {
            totalCount
          }
          oldestRepo: repositories(first: 1, orderBy: {field: CREATED_AT, direction: ASC}) {
            nodes {
              createdAt
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes {
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
        username: GITHUB_USERNAME,
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!GITHUB_TOKEN) {
        return res
            .status(500)
            .json({ error: "Token do GitHub não configurado no servidor." });
    }

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers,
            body: JSON.stringify(graphqlQuery),
        });

        if (!response.ok) {
            throw new Error(
                `Erro na API GraphQL do GitHub: ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        const userData = jsonResponse.data.user;

        const languages: Record<string, number> = {};
        userData.repositories.nodes.forEach((repo: any) => {
            repo.languages.edges.forEach((edge: any) => {
                languages[edge.node.name] =
                    (languages[edge.node.name] || 0) + edge.size;
            });
        });

        const commitData: { week: number; total: number }[] = [];
        userData.contributionsCollection.contributionCalendar.weeks.forEach(
            (week: any) => {
                let weekTotal = 0;
                let weekStartDate = 0;
                if (week.contributionDays.length > 0) {
                    weekStartDate =
                        new Date(week.contributionDays[0].date).getTime() /
                        1000;
                }
                week.contributionDays.forEach((day: any) => {
                    weekTotal += day.contributionCount;
                });
                if (weekStartDate > 0) {
                    commitData.push({ week: weekStartDate, total: weekTotal });
                }
            }
        );

        const responseData = {
            stats: {
                public_repos: userData.publicRepos.totalCount,
                oldest_repo_date:
                    userData.oldestRepo.nodes[0]?.createdAt || null,
            },
            languages: languages,
            commits: [commitData],
        };

        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
        return res.status(200).json(responseData);
    } catch (error: any) {
        console.error("Erro na Vercel Function:", error);
        return res
            .status(500)
            .json({
                error: "Falha ao buscar dados do GitHub.",
                details: error.message,
            });
    }
}
