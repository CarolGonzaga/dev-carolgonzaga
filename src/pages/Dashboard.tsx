import { useEffect, useMemo, useRef } from 'react';
import { useGitHubData } from '../context/GitHubDataContext';
import { projectsData } from '../data/projects';

import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFolder, faHourglassHalf, faCodeBranch, faCode, faServer,
    faUsers, faPuzzlePiece, faArrowsRotate, faRocket, faLaptopCode,
    faDatabase, faCloud, faRobot
} from '@fortawesome/free-solid-svg-icons';
import { faHtml5, faJs, faReact, faNodeJs, faVuejs } from '@fortawesome/free-brands-svg-icons';

import Carousel from '../components/Carousel';
import Header from '../components/Header';

Chart.register(ChartDataLabels);

const technologies = [
    { name: 'HTML - CSS', icon: faHtml5, percentage: '100%', level: 'Senior' },
    { name: 'JAVASCRIPT', icon: faJs, percentage: '90%', level: 'Senior' },
    { name: 'TYPESCRIPT', icon: faCode, percentage: '80%', level: 'Pleno' },
    { name: 'REACT', icon: faReact, percentage: '60%', level: 'Pleno' },
    { name: 'API REST', icon: faServer, percentage: '40%', level: 'Júnior' },
    { name: 'NODE', icon: faNodeJs, percentage: '35%', level: 'Júnior' },
    { name: 'VUE JS', icon: faVuejs, percentage: '30%', level: 'Júnior' }
];

const slidesData = [
    { id: 1, icon: faLaptopCode, title: 'Design UX/UI', text: 'Interfaces intuitivas com foco no usuário.' },
    { id: 2, icon: faDatabase, title: 'API e Banco de Dados', text: 'APIs REST seguras e bancos de dados otimizados.' },
    { id: 3, icon: faCloud, title: 'Computação em Nuvem', text: 'Deploy e serviços essenciais de Google Cloud (GCP) e AWS.' },
    { id: 4, icon: faRobot, title: 'Automação & IA', text: 'Integrações com APIs de IA para otimizar processos.' }
];


function Dashboard() {

    const { data, isLoading, error } = useGitHubData();

    const stats = data ? data.stats : { public_repos: 0, oldest_repo_date: null };
    const languages = data ? data.languages : null;
    const commits = data ? data.commits : null;

    const languageChartRef = useRef<Chart | null>(null);
    const commitChartRef = useRef<Chart | null>(null);

    // --- CÁLCULO DAS HORAS DE CÓDIGO ---
    const totalHours = useMemo(() => {
        if (!stats.oldest_repo_date) return 0;
        const firstCommitDate = new Date(stats.oldest_repo_date);
        const today = new Date();
        const diffMilliseconds = today.getTime() - firstCommitDate.getTime();
        const weeksSinceFirstCommit = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24 * 7));
        const hours = weeksSinceFirstCommit * 8;
        return hours > 1000 ? `${(hours / 1000).toFixed(1)}k` : hours;
    }, [stats.oldest_repo_date]);

    // --- EFEITO PARA RENDERIZAR GRÁFICO DE LINGUAGENS ---
    useEffect(() => {
        // Só tenta renderizar se 'languages' tiver dados e não estiver carregando
        if (languages && !isLoading) {
            const canvas = document.getElementById('languageChart') as HTMLCanvasElement;
            if (canvas) {
                // Se já existir um gráfico nessa referência, destrua-o antes de criar um novo
                if (languageChartRef.current) {
                    languageChartRef.current.destroy();
                }

                // ======================================================
                //  INÍCIO DA SUA LÓGICA ORIGINAL (JÁ ADAPTADA)
                // ======================================================

                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

                const sortedLangs = Object.entries(languages as Record<string, number>)
                    .filter(([lang]) => lang !== "Jupyter Notebook")
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5);

                const labels = sortedLangs.map(([lang]) => lang);
                const data = sortedLangs.map(([, bytes]) => bytes);

                const backgroundColors = isDark
                    ? ["#CA4371", "#BFA8E5", "#4F3D6B", "#E884A8", "#7D6B9E"]
                    : ["#CA4371", "#4F3D6B", "#E884A8", "#BFA8E5", "#F9E6EE"];

                // Cria o novo gráfico e salva a instância na referência
                languageChartRef.current = new Chart(canvas.getContext('2d')!, {
                    type: "doughnut",
                    data: {
                        labels,
                        datasets: [
                            {
                                label: "Bytes de Código",
                                data,
                                backgroundColor: backgroundColors,
                                borderColor: "transparent",
                                borderWidth: 0,
                                spacing: 4,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: "65%",
                        plugins: {
                            legend: {
                                position: "right",
                                labels: {
                                    color: isDark ? "#B8B1C5" : "#555555",
                                    boxWidth: 15,
                                    padding: 15,
                                    font: { family: "'Poppins'", size: 12 },
                                },
                            },
                            datalabels: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const label = context.label || "";
                                        const value = context.parsed;
                                        const total = context.dataset.data.reduce(
                                            (a, b) => a + b,
                                            0
                                        );
                                        const percentage = (
                                            (value / total) *
                                            100
                                        ).toFixed(1);
                                        return `${label}: ${percentage}%`;
                                    },
                                },
                                backgroundColor: isDark
                                    ? "rgba(35,31,44,0.9)"
                                    : "rgba(255,255,255,0.9)",
                                borderColor: "#CA4371",
                                borderWidth: 1,
                                titleColor: isDark ? "#EAE6F2" : "#333333",
                                bodyColor: isDark ? "#BFA8E5" : "#555555",
                                padding: 12,
                                cornerRadius: 8,
                            },
                        },
                    },
                });

                // ======================================================
                //  FIM DA SUA LÓGICA ORIGINAL
                // ======================================================
            }
        }
    }, [languages, isLoading]);

    // --- EFEITO PARA RENDERIZAR GRÁFICO DE COMMITS (BARRAS) ---
    useEffect(() => {

        if (commits && !isLoading) {

            const canvas = document.getElementById('commitChart') as HTMLCanvasElement;

            if (canvas) {

                if (commitChartRef.current) {

                    commitChartRef.current.destroy();

                }


                const currentYear = new Date().getFullYear();

                const monthlyCommits = new Array(12).fill(0);



                (commits as any[]).forEach((repoStats) => {

                    if (Array.isArray(repoStats)) {

                        repoStats.forEach((weekData) => {

                            const weekDate = new Date(weekData.week * 1000);

                            if (weekDate.getFullYear() === currentYear) {

                                monthlyCommits[weekDate.getMonth()] += weekData.total;

                            }

                        });

                    }

                });



                const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];



                commitChartRef.current = new Chart(canvas.getContext('2d')!, {

                    type: "bar",

                    data: {

                        labels: labels,

                        datasets: [

                            {

                                label: "Commits",

                                data: monthlyCommits,

                                backgroundColor: (context) =>

                                    (context.raw as number) > 0 ? "#E54A84" : "transparent",

                                borderColor: (context) =>

                                    (context.raw as number) > 0 ? "#E54A84" : "transparent",

                                borderWidth: 1,

                                borderRadius: 4,

                            },

                        ],

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        plugins: {

                            datalabels: { display: false },

                            legend: { display: false },

                            tooltip: {

                                filter: (tooltipItem) => (tooltipItem.raw as number) > 0,

                                callbacks: {

                                    title: (context) => `Mês: ${context[0].label}`,

                                    label: (context) => `${context.parsed.y} commits`,

                                },

                            },

                        },

                        scales: {

                            y: {

                                beginAtZero: true,

                                ticks: { color: "#aaa" },

                            },

                            x: {

                                ticks: { color: "#aaa" },

                                grid: { color: "transparent" },

                            },

                        }

                    }

                });

            }

        }

    }, [commits, isLoading]);

    const memoizedCarousel = useMemo(() => {
        return <Carousel slides={slidesData} />;
    }, []);

    return (
        <>
            <Header
                title="Olá, Visitantes!"
                subtitle="Bem-vindos ao meu portfólio profissional de desenvolvimento."
            />

            <h2 className="sr-only">Painel de Controle e Estatísticas</h2>

            <section className="main-dashboard-grid">
                <div className="stat-cards-group">
                    <div className="stat-projetos stat-card">
                        <div className="stat-icon-wrapper">
                            <FontAwesomeIcon icon={faFolder} className="sidebar-icon" aria-hidden="true" />
                        </div>
                        <div className="stat-content">
                            <p>Projetos Publicados</p>
                            <h3 id="stats-projects">
                                {String(projectsData.length).padStart(2, '0')}
                            </h3>
                        </div>
                    </div>
                    <div className="stat-horas stat-card">
                        <div className="stat-icon-wrapper">
                            <FontAwesomeIcon icon={faHourglassHalf} className="sidebar-icon" aria-hidden="true" />
                        </div>
                        <div className="stat-content">
                            <p>Horas de Código</p>
                            <h3 id="stats-hours">{isLoading ? '...' : totalHours}</h3>
                        </div>
                    </div>
                    <div className="stat-criados stat-card">
                        <div className="stat-icon-wrapper">
                            <FontAwesomeIcon icon={faCodeBranch} className="sidebar-icon" aria-hidden="true" />
                        </div>
                        <div className="stat-content">
                            <p>Repositórios Criados</p>
                            <h3 id="stats-repos">{isLoading ? '...' : String(stats.public_repos).padStart(2, '0')}</h3>
                        </div>
                    </div>
                </div>

                <div className="card languages-chart-card">
                    <h3>Linguagens mais utilizadas</h3>
                    <div className="chart-container">
                        {isLoading ? (
                            <p style={{ textAlign: 'center', color: 'var(--texto-light)' }}>Carregando gráfico...</p>
                        ) : error ? (
                            <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
                        ) : (
                            <canvas id="languageChart" role="img" aria-label="Gráfico de linguagens."></canvas>
                        )}
                    </div>
                </div>

                <div className="card technologies-card">
                    <h3>Tecnologias Conhecidas</h3>
                    <ul className="skills-list">
                        {technologies.map((tech) => (
                            <li className={tech.level.toLowerCase()} key={tech.name}>
                                <div className="skill-info">
                                    <FontAwesomeIcon icon={tech.icon} aria-hidden="true" className="sidebar-icon" />
                                    <span>{tech.name}</span>
                                </div>
                                <div className="bar"><div style={{ width: tech.percentage }}></div></div>
                                <span className={`tag ${tech.level.toLowerCase()}`}>{tech.level}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card commits-chart-card">
                    <h3>Evolução de contribuições no GitHub</h3>
                    <div className="chart-container">
                        {isLoading ? (
                            <p style={{ textAlign: 'center', color: 'var(--texto-light)' }}>Calculando estatísticas...</p>
                        ) : error ? (
                            <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
                        ) : (
                            <canvas id="commitChart" role="img" aria-label="Gráfico de commits."></canvas>
                        )}
                    </div>
                </div>

                <div className="card soft-skills-card">
                    <h3>Soft Skills</h3>
                    <ul className="soft-skills-list">
                        <li><FontAwesomeIcon icon={faUsers} className="sidebar-icon" aria-hidden="true" /><span>Comunicação e Colaboração</span></li>
                        <li><FontAwesomeIcon icon={faPuzzlePiece} className="sidebar-icon" aria-hidden="true" /><span>Resolução de Problemas</span></li>
                        <li><FontAwesomeIcon icon={faArrowsRotate} className="sidebar-icon" aria-hidden="true" /><span>Adaptabilidade e Aprendizado</span></li>
                        <li><FontAwesomeIcon icon={faRocket} className="sidebar-icon" aria-hidden="true" /><span>Iniciativa e Visão de Negócio</span></li>
                    </ul>
                </div>

                <div className="card carousel-card">
                    <h3>Destaques</h3>
                    {memoizedCarousel}
                </div>
            </section>
        </>
    );
}

export default Dashboard;