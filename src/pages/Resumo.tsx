import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Header from '../components/Header';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';

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

    const formacaoItems = educationData.filter(item => item.category === 'Formação');
    const cursoItems = educationData.filter(item => item.category === 'Curso');

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
                            {experienceData.map((item) => (
                                <div className="experience-item" key={item.id}>
                                    <span className="date">{item.date}</span>
                                    <h4 className="title">{item.title}</h4>
                                    <p className="company">{item.company}</p>
                                    <ul className="details">
                                        {item.details.map((detail, index) => (
                                            <li key={index}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="card education-card">
                    <h3>Formação</h3>
                    <div className="education-list">
                        {formacaoItems.map(item => (
                            <div className="education-item" key={item.id}>
                                <span className="date">{item.date}</span>
                                <h4 className="title">{item.title}</h4>
                                <p className="institution">{item.institution}</p>
                            </div>
                        ))}
                    </div>

                    <div className="card-divider"></div>

                    <div className="courses-card">
                        <h3>Cursos</h3>
                        <div className="education-list">
                            {cursoItems.map(item => (
                                <div className="education-item" key={item.id}>
                                    <span className="date">{item.date}</span>
                                    <h4 className="title">{item.title}</h4>
                                    <p className="institution">{item.institution}</p>
                                </div>
                            ))}
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