import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

interface GitHubData {
    stats: any;
    languages: any;
    commits: any;
}

interface GitHubContextType {
    data: GitHubData | null;
    isLoading: boolean;
    error: string | null;
}

const GitHubDataContext = createContext<GitHubContextType>({
    data: null,
    isLoading: true,
    error: null,
});

export const useGitHubData = () => {
    return useContext(GitHubDataContext);
};

export const GitHubDataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<GitHubData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cache = localStorage.getItem('githubDataCache');
                const now = new Date().getTime();
                const ONE_HOUR = 60 * 60 * 1000;

                if (cache) {
                    const { timestamp, cachedData } = JSON.parse(cache);
                    if (now - timestamp < ONE_HOUR) {
                        setData(cachedData);
                        setIsLoading(false);
                        return;
                    }
                }

                const response = await fetch('/api/github-data');
                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.statusText}`);
                }
                const fetchedData = await response.json();

                const newData = {
                    stats: fetchedData.stats,
                    languages: fetchedData.languages,
                    commits: fetchedData.commits,
                };

                setData(newData);

                localStorage.setItem('githubDataCache', JSON.stringify({
                    timestamp: now,
                    cachedData: newData,
                }));

            } catch (err: any) {
                setError('Falha ao carregar os dados do GitHub.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const value = { data, isLoading, error };

    return (
        <GitHubDataContext.Provider value={value}>
            {children}
        </GitHubDataContext.Provider>
    );
};