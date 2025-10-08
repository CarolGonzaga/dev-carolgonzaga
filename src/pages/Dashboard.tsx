// Arquivo: src/pages/Dashboard.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFolder, faHourglassHalf, faCodeBranch, faCode, faServer,
    faUsers, faPuzzlePiece, faArrowsRotate, faRocket, faLaptopCode,
    faDatabase, faCloud, faRobot, faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { faHtml5, faJs, faReact, faNodeJs, faPython } from '@fortawesome/free-brands-svg-icons';

import logoImg from '../assets/images/logo-carol-gonzaga.png';

function Dashboard() {
    const technologies = [
        { name: 'HTML - CSS', icon: faHtml5, percentage: '100%', level: 'Senior' },
        { name: 'JAVASCRIPT', icon: faJs, percentage: '90%', level: 'Senior' },
        { name: 'TYPESCRIPT', icon: faCode, percentage: '80%', level: 'Pleno' },
        { name: 'REACT', icon: faReact, percentage: '60%', level: 'Pleno' },
        { name: 'API REST', icon: faServer, percentage: '40%', level: 'Júnior' },
        { name: 'NODE', icon: faNodeJs, percentage: '30%', level: 'Júnior' },
        { name: 'PYTHON', icon: faPython, percentage: '30%', level: 'Júnior' }
    ];

    const slidesData = [
        {
            id: 1,
            icon: faLaptopCode,
            title: 'Design UX/UI',
            text: 'Interfaces intuitivas com foco no usuário.'
        },
        {
            id: 2,
            icon: faDatabase,
            title: 'API e Banco de Dados',
            text: 'APIs REST seguras e bancos de dados otimizados.'
        },
        {
            id: 3,
            icon: faCloud,
            title: 'Computação em Nuvem',
            text: 'Deploy e serviços essenciais de Google Cloud (GCP) e AWS.'
        },
        {
            id: 4,
            icon: faRobot,
            title: 'Automação & IA',
            text: 'Integrações com APIs de IA para otimizar processos.'
        }
    ];

    return (
        <>
            <header className="main-header">
                <div className="welcome-message">
                    <h1>Olá, Visitantes!</h1>
                    <p>Bem-vindos ao meu portfólio profissional de desenvolvimento.</p>
                </div>
                <div className="header-logo-widget">
                    <img src={logoImg} alt="Logotipo de Carol Gonzaga" />
                </div>
            </header>

            <h2 className="sr-only">Painel de Controle e Estatísticas</h2>

            <section className="main-dashboard-grid">
                <div className="stat-cards-group">
                    <div className="stat-projetos stat-card">
                        <div className="stat-icon-wrapper">
                            <FontAwesomeIcon icon={faFolder} className="sidebar-icon" aria-hidden="true" />
                        </div>
                        <div className="stat-content">
                            <p>Projetos Publicados</p>
                            <h3 id="stats-projects">00</h3>
                        </div>
                    </div>

                    <div className="stat-horas stat-card">
                        <div className="stat-icon-wrapper">
                            <FontAwesomeIcon icon={faHourglassHalf} className="sidebar-icon" aria-hidden="true" />
                        </div>
                        <div className="stat-content">
                            <p>Horas de Código</p>
                            <h3 id="stats-hours">--</h3>
                        </div>
                    </div>

                    <div className="stat-criados stat-card">
                        <div className="stat-icon-wrapper">
                            <FontAwesomeIcon icon={faCodeBranch} className="sidebar-icon" aria-hidden="true" />
                        </div>
                        <div className="stat-content">
                            <p>Repositórios Criados</p>
                            <h3 id="stats-repos">00</h3>
                        </div>
                    </div>
                </div>

                <div className="card languages-chart-card">
                    <h3>Linguagens mais utilizadas</h3>
                    <div className="chart-container">
                        <p style={{ textAlign: 'center', color: 'var(--texto-light)' }}>Gráfico será carregado aqui.</p>
                        {/* <canvas id="languageChart" role="img" aria-label="Gráfico de linguagens."></canvas> */}
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
                                <div className="bar">
                                    <div style={{ width: tech.percentage }}></div>
                                </div>
                                <span className={`tag ${tech.level.toLowerCase()}`}>{tech.level}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card commits-chart-card">
                    <h3>Evolução de contribuições no GitHub em 2025</h3>
                    <div className="chart-container">
                        <p style={{ textAlign: 'center', color: 'var(--texto-light)' }}>Gráfico será carregado aqui.</p>
                        {/* <canvas id="commitChart" role="img" aria-label="Gráfico de commits."></canvas> */}
                    </div>
                </div>

                <div className="card soft-skills-card">
                    <h3>Soft Skills</h3>
                    <ul className="soft-skills-list">
                        <li>
                            <FontAwesomeIcon icon={faUsers} className="sidebar-icon" aria-hidden="true" />
                            <span>Comunicação e Colaboração</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPuzzlePiece} className="sidebar-icon" aria-hidden="true" />
                            <span>Resolução de Problemas</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faArrowsRotate} className="sidebar-icon" aria-hidden="true" />
                            <span>Adaptabilidade e Aprendizado</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faRocket} className="sidebar-icon" aria-hidden="true" />
                            <span>Iniciativa e Visão de Negócio</span>
                        </li>
                    </ul>
                </div>

                <div className="carousel-card card">
                    <h3>Destaques</h3>
                    <div className="carousel">
                        <div className="carousel-slides">
                            {slidesData.map((slide) => (
                                <div className="slide" key={slide.id}>
                                    <div className="slide-content">
                                        <FontAwesomeIcon icon={slide.icon} className="sidebar-icon" />
                                        <h4>{slide.title}</h4>
                                        <p>{slide.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-nav-btn prev" aria-label="Slide anterior">
                            <FontAwesomeIcon icon={faChevronLeft} className="sidebar-icon" />
                        </button>
                        <button className="carousel-nav-btn next" aria-label="Próximo slide">
                            <FontAwesomeIcon icon={faChevronRight} className="sidebar-icon" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Dashboard;