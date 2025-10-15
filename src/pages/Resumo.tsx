import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Header from '../components/Header';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';

import styles from '../styles/_resumo.module.scss';

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

            <div className={styles.resumoGridContainer}>
                <div className={`card ${styles.aboutCard}`}>
                    <h3>Sobre Mim</h3>
                    <p>
                        Desenvolvedora Front-End com foco em interfaces modernas e responsivas, utilizando React.js, Vue.js, TypeScript e Next.js. Atualmente, atuo como Analista SAP na Numen IT, desenvolvendo integrações em SAP BTP (CPI, API Management e CDS Views) e ampliando minha visão sobre arquitetura e conectividade entre sistemas.
                    </p>
                    <p>
                        Com mais de 14 anos de experiência empreendedora, desenvolvi forte capacidade de organização, resolução de problemas e colaboração multidisciplinar.
                    </p>
                    <p>
                        Estou cursando pós-graduação em Desenvolvimento Full Stack, com o objetivo de expandir minha base técnica e unir o melhor do front-end, integrações e back-end para criar soluções completas e de alto desempenho.
                    </p>
                </div>

                <div className={`card ${styles.experienceCard}`}>
                    <h3>Experiência Profissional</h3>
                    <div className={styles.experienceList}>
                        <div className={styles.experienceScrollContent}>
                            {experienceData.map((item) => (
                                <div className={styles.experienceItem} key={item.id}>
                                    <span className={styles.date}>{item.date}</span>
                                    <h4 className={styles.title}>{item.title}</h4>
                                    <p className={styles.company}>{item.company}</p>
                                    <ul className={styles.details}>
                                        {item.details.map((detail, index) => (
                                            <li key={index}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`card ${styles.educationCard}`}>
                    <h3>Formação</h3>
                    <div className={styles.educationList}>
                        {formacaoItems.map(item => (
                            <div className={styles.educationItem} key={item.id}>
                                <span className={styles.date}>{item.date}</span>
                                <h4 className={styles.title}>{item.title}</h4>
                                <p className={styles.institution}>{item.institution}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.cardDivider}></div>

                    <div className={styles.coursesCard}>
                        <h3>Cursos</h3>
                        <div className={styles.educationList}>
                            {cursoItems.map(item => (
                                <div className={styles.educationItem} key={item.id}>
                                    <span className={styles.date}>{item.date}</span>
                                    <h4 className={styles.title}>{item.title}</h4>
                                    <p className={styles.institution}>{item.institution}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`card ${styles.languagesCard}`}>
                    <h3>Inglês</h3>
                    <div className={styles.gaugeContainer}>
                        <div className={styles.gaugeChartWrapper}>
                            <canvas ref={gaugeChartRef}></canvas>
                            <svg className={styles.gaugeGuide} viewBox="0 0 220 120" preserveAspectRatio="xMidYMid meet">
                                <path
                                    className={styles.gaugeGuideArc}
                                    d="M 20 100 A 90 90 0 0 1 200 100"
                                    fill="none"
                                />
                            </svg>
                            <div
                                className={styles.gaugeArrowWrapper}
                                style={{ transform: `rotate(${angle}deg)` }}
                            >
                                <div className={styles.gaugeArrow}></div>
                            </div>
                            <div className={styles.gaugeLabel}>
                                <span className={styles.gaugeValue}>
                                    {proficiencyValue}
                                    <span className={styles.percentSign}>%</span>
                                </span>
                                <span className={styles.gaugeText}>{proficiencyLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resumo;