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
        // Vamos buscar os dados principais em paralelo
        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
                headers,
            }),
            fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=created&direction=asc&per_page=100`,
                { headers }
            ),
        ]);

        if (!userResponse.ok) {
            throw new Error(
                `Erro na API do GitHub ao buscar usuário: ${userResponse.statusText}`
            );
        }
        if (!reposResponse.ok) {
            throw new Error(
                `Erro na API do GitHub ao buscar repositórios: ${reposResponse.statusText}`
            );
        }

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        // Extrai a data do repositório mais antigo
        const oldestRepoDate =
            reposData.length > 0 ? reposData[0].created_at : null;

        // Processa as linguagens de forma mais simples
        const languages: Record<string, number> = {};
        reposData.forEach((repo: any) => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        const responseData = {
            stats: {
                public_repos: userData.public_repos,
                oldest_repo_date: oldestRepoDate,
            },
            languages: languages,
            // Temporariamente removemos a busca de commits que é a mais problemática
            commits: [],
        };

        // Define o cache header
        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate"); // Cache de 1 hora
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
