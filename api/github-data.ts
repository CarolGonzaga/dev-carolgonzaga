import type { VercelRequest, VercelResponse } from "@vercel/node";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const GITHUB_USERNAME = "CarolGonzaga";
const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    "User-Agent": "CarolGonzaga-Portfolio-API",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!GITHUB_TOKEN) {
        return res
            .status(500)
            .json({ error: "Token do GitHub não configurado no servidor." });
    }

    try {
        const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
            { headers }
        );
        if (!reposResponse.ok)
            throw new Error(
                `Erro na API do GitHub ao buscar repos: ${reposResponse.statusText}`
            );
        const repos: any[] = await reposResponse.json();

        const [
            userData,
            starredData,
            oldestRepoData,
            allLanguages,
            allCommits,
        ] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
                headers,
            }).then((res) => res.json()),

            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/starred`, {
                headers,
            }).then((res) => res.json()),

            fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=created&direction=asc&per_page=1`,
                { headers }
            ).then((res) => res.json()),
            Promise.all(
                repos.map((repo) =>
                    fetch(repo.languages_url, { headers }).then((response) =>
                        response.json()
                    )
                )
            ),
            Promise.all(
                repos.map((repo) =>
                    fetch(
                        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/commit_activity`,
                        { headers }
                    ).then((res) => (res.ok ? res.json() : []))
                )
            ),
        ]);

        const totalBytes: Record<string, number> = {};
        allLanguages.forEach((repoLangs: Record<string, number>) => {
            for (const lang in repoLangs) {
                totalBytes[lang] = (totalBytes[lang] || 0) + repoLangs[lang];
            }
        });

        const responseData = {
            languages: totalBytes,
            commits: allCommits.filter(
                (c: any) => Array.isArray(c) && c.length > 0
            ),
            stats: {
                public_repos: (userData as any).public_repos,
                starred_count: (starredData as any[]).length,
                oldest_repo_date:
                    (oldestRepoData as any[]).length > 0
                        ? (oldestRepoData as any)[0].created_at
                        : null,
            },
        };

        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate"); // Cache de 1 hora
        return res.status(200).json(responseData);
    } catch (error: any) {
        console.error("Erro no backend da API:", error);
        return res
            .status(500)
            .json({ error: "Falha ao buscar dados do GitHub." });
    }
}
