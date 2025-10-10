import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

// Define a estrutura dos dados que vamos armazenar
interface GitHubData {
    stats: any;
    languages: any;
    commits: any;
}

// Define o que o nosso contexto irá fornecer aos componentes
interface GitHubContextType {
    data: GitHubData | null;
    isLoading: boolean;
    error: string | null;
}

// Cria o Contexto
const GitHubDataContext = createContext<GitHubContextType>({
    data: null,
    isLoading: true,
    error: null,
});

// Hook customizado para facilitar o uso do contexto
export const useGitHubData = () => {
    return useContext(GitHubDataContext);
};

// Componente "Provedor" que vai conter a lógica
export const GitHubDataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<GitHubData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // --- INÍCIO DA LÓGICA DE CACHE ---
                const cache = localStorage.getItem('githubDataCache');
                const now = new Date().getTime();
                const ONE_HOUR = 60 * 60 * 1000; // 1 hora em milissegundos

                if (cache) {
                    const { timestamp, cachedData } = JSON.parse(cache);
                    // Se o cache existe e tem menos de 1 hora, use-o
                    if (now - timestamp < ONE_HOUR) {
                        setData(cachedData);
                        setIsLoading(false);
                        return; // Interrompe a função aqui para não buscar na API
                    }
                }
                // --- FIM DA LÓGICA DE CACHE ---

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

                // Salva os novos dados e o timestamp no localStorage
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
    }, []); // O array de dependências vazio [] garante que esta lógica rode apenas uma vez.

    const value = { data, isLoading, error };

    return (
        <GitHubDataContext.Provider value={value}>
            {children}
        </GitHubDataContext.Provider>
    );
};