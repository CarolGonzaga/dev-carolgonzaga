// Arquivo: /api/github-data.js

import fetch from "node-fetch";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "CarolGonzaga";
const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    "User-Agent": "CarolGonzaga-Portfolio-API",
};

export default async function handler(req, res) {
    export default async function handler(req, res) {
    try {
        // DEBUG: checar se a variável está disponível
        console.log("TOKEN lido?", !!process.env.GITHUB_TOKEN);

        const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
            { headers }
        );
    
    try {
        const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
            { headers }
        );
        if (!reposResponse.ok)
            throw new Error(
                `GitHub API Error for repos: ${reposResponse.statusText}`
            );
        const repos = await reposResponse.json();

        // --- BUSCA PARALELA DE TODOS OS DADOS ---
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

        // --- PROCESSAMENTO DOS DADOS ---
        const totalBytes = {};
        allLanguages.forEach((repoLangs) => {
            for (const lang in repoLangs) {
                totalBytes[lang] = (totalBytes[lang] || 0) + repoLangs[lang];
            }
        });

        const responseData = {
            languages: totalBytes,
            commits: allCommits.filter((c) => Array.isArray(c) && c.length > 0),
            stats: {
                public_repos: userData.public_repos,
                starred_count: starredData.length,
                oldest_repo_date:
                    oldestRepoData.length > 0
                        ? oldestRepoData[0].created_at
                        : null,
            },
        };

        // Envia a resposta com sucesso
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Erro no backend da API:", error);
        res.status(500).json({ error: "Falha ao buscar dados do GitHub." });
    }
}
