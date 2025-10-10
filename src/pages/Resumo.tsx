import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Header from '../components/Header';

Chart.register(ChartDataLabels);

function Resumo() {

    const proficiencyValue = 60;
    const proficiencyLabel = "Intermediário";
    const angle = ((proficiencyValue / 100) * 180) - 90 / (30 / 2);
    const gaugeChartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!gaugeChartRef.current) return;
        const ctx = gaugeChartRef.current.getContext("2d");
        if (!ctx) return;

        const existingChart = Chart.getChart(gaugeChartRef.current);
        if (existingChart) existingChart.destroy();

        const totalSegments = 30;
        const filledSegments = Math.round((proficiencyValue / 100) * totalSegments);

        const dataValues = new Array(totalSegments).fill(1);
        const backgroundColors = dataValues.map((_, i) =>
            i < filledSegments ? "#CA4371" : "#E0E0E0"
        );

        new Chart(ctx, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: dataValues,
                        backgroundColor: backgroundColors,
                        borderWidth: 0,
                        borderColor: 'transparent',
                        spacing: 70,
                        borderRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                circumference: 180,
                rotation: -90,
                cutout: '65%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                    datalabels: { display: false },
                },
                animation: { duration: 0 },
            },
        });
    }, [proficiencyValue]);




    return (

        <>
            <Header title="Resumo" />

            <div className="resumo-grid-container">
                <div className="card about-card">
                    <h3>Sobre Mim</h3>
                    <p>
                        Desenvolvedora Front-End com experiência em criação de interfaces modernas e intuitivas, especializada no uso de tecnologias como React.js, Vue.js, TypeScript e Node.js. Com mais de 14 anos de vivência como empreendedora, desenvolvi habilidades excepcionais em comunicação, resolução de problemas e gestão de projetos.
                    </p>
                    <p>
                        Atualmente, dedico-me ao desenvolvimento de aplicações web escaláveis e dinâmicas, com foco em user experience e performance. Estou sempre em busca de novos aprendizados e tecnologias, o que me permite contribuir de forma consistente para equipes dedicadas a criar soluções inovadoras e de alto impacto.
                    </p>
                </div>

                <div className="card experience-card">
                    <h3>Experiência Profissional</h3>
                    <div className="experience-list">
                        <div className="experience-scroll-content">
                            <div className="experience-item">
                                <span className="date">2024 - Atual</span>
                                <h4 className="title">Desenvolvedora Front End</h4>
                                <p className="company">Projetos Pessoais e Freelance</p>
                                <ul className="details">
                                    <li>Configuração e gerenciamento de ambientes de desenvolvimento estáveis para
                                        projetos web.</li>
                                    <li>Desenvolvimento de interfaces responsivas e interativas usando React.js, Vue.js e
                                        bibliotecas associadas.</li>
                                    <li> Implementação de funcionalidades com Next.js e Vue Router, integrando APIs externas
                                        para ampliar funcionalidades.</li>
                                    <li>Utilização de boas práticas de desenvolvimento, como versionamento com Git e uso de
                                        styled-components para estilização.</li>
                                    <li>Organização de arquivos e documentação do código para garantir qualidade e facilitar
                                        manutenção.</li>
                                    <li> Implantação de aplicações em ambientes de produção com foco em performance e
                                        disponibilidade.</li>
                                </ul>
                            </div>

                            <div className="experience-item">
                                <span className="date">2017 - 2024</span>
                                <h4 className="title">Sócia Proprietária</h4>
                                <p className="company">Lima Limão Baby Store Ltda</p>
                                <ul className="details">
                                    <li>Gerenciei o e-commerce, incluindo controle de pedidos, estoque e criação de campanhas digitais. </li>
                                    <li>Desenvolvi estratégias para aumento de tráfego orgânico no site e conversão em
                                        vendas. </li>
                                </ul>
                            </div>

                            <div className="experience-item">
                                <span className="date">2010 - 2016</span>
                                <h4 className="title">Sócia Proprietária</h4>
                                <p className="company">Baby Center Comércio de Fraldas Ltda</p>
                                <ul className="details">
                                    <li>Liderava toda a operação do site e loja virtual.</li>
                                    <li>Integrei tecnologias para automatizar processos e otimizar vendas.</li>
                                </ul>
                            </div>

                            <div className="experience-item">
                                <span className="date">2009 - 2010</span>
                                <h4 className="title">Auxiliar de Loja</h4>
                                <p className="company">União Pereira Assistência Técnica</p>
                                <ul className="details">
                                    <li>Prestava suporte técnico básico, realizava orçamentos e atendia clientes no ponto de
                                        venda.</li>
                                    <li>Assistência técnica domiciliar.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card education-card">
                    <h3>Formação</h3>
                    <div className="education-list">
                        <div className="education-item">
                            <span className="date">2025 - 2026 | Pós Graduação</span>
                            <h4 className="title">Desenvolvimento Full Stack</h4>
                            <p className="institution">FIAP</p>
                        </div>
                        <div className="education-item">
                            <span className="date">2022 - 2024 | Graduação</span>
                            <h4 className="title">Sistemas para Internet</h4>
                            <p className="institution">SENAC</p>
                        </div>
                    </div>

                    <div className="card-divider"></div>

                    <div className="courses-card">
                        <h3>Cursos</h3>
                        <div className="education-list">
                            <div className="education-item">
                                <span className="date">2023 - 2024</span>
                                <h4 className="title">FrontEnd Master</h4>
                                <p className="institution">DevSamurai</p>
                            </div>
                            <div className="education-item">
                                <span className="date">2007 - 2007</span>
                                <h4 className="title">Montagem e Manutenção de Micros</h4>
                                <p className="institution">SENAI</p>
                            </div>
                            <div className="education-item">
                                <span className="date">2003 - 2007</span>
                                <h4 className="title">Técnico em Computação Jr</h4>
                                <p className="institution">CEDASPY</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card languages-card">
                    <h3>Inglês</h3>
                    <div className="gauge-container">
                        <div className="gauge-chart-wrapper">
                            <canvas ref={gaugeChartRef}></canvas>

                            <svg className="gauge-guide" viewBox="0 0 220 120" preserveAspectRatio="xMidYMid meet">
                                <path
                                    className="gauge-guide-arc"
                                    d="M 20 100 A 90 90 0 0 1 200 100"
                                    fill="none"
                                />
                            </svg>

                            <div
                                className="gauge-arrow-wrapper"
                                style={{ transform: `rotate(${angle}deg)` }}
                            >
                                <div className="gauge-arrow"></div>
                            </div>

                            <div className="gauge-label">
                                <span className="gauge-value">
                                    {proficiencyValue}
                                    <span className="percent-sign">%</span>
                                </span>
                                <span className="gauge-text">{proficiencyLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resumo;