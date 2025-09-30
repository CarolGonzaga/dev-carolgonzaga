// Arquivo: assets/js/script.js

document.addEventListener("DOMContentLoaded", () => {
    // Registra o plugin para exibir labels nos gráficos
    Chart.register(ChartDataLabels);

    // --- FUNÇÕES DE RENDERIZAÇÃO (DESENHO) ---
    // Essas funções não buscam mais dados, apenas os recebem e desenham na tela.

    function renderLanguageChart(languagesData) {
        const ctx = document.getElementById("languageChart").getContext("2d");
        const sortedLangs = Object.entries(languagesData)
            .filter(([lang]) => lang !== "Jupyter Notebook")
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);
        const labels = sortedLangs.map(([lang]) => lang);
        const data = sortedLangs.map(([, bytes]) => bytes);

        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Bytes de Código",
                        data: data,
                        backgroundColor: [
                            "#d43164",
                            "#CA4371",
                            "#E54A84",
                            "#7A3F6A",
                            "#B865A1",
                        ],
                        borderColor: "#1a1a1a",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "right",
                        labels: {
                            color: "#F0F0F0",
                            boxWidth: 15,
                            padding: 15,
                            font: { family: "'Poppins', sans-serif", size: 12 },
                        },
                    },
                    datalabels: {
                        formatter: (value, context) => {
                            const total =
                                context.chart.data.datasets[0].data.reduce(
                                    (acc, data) => acc + data,
                                    0
                                );
                            return ((value / total) * 100).toFixed(1) + "%";
                        },
                        color: "#fff",
                        font: {
                            weight: "normal",
                            family: "'Poppins', sans-serif",
                            size: 10,
                        },
                    },
                },
                cutout: "70%",
            },
        });
    }

    function renderCommitChart(commitsData) {
        const ctx = document.getElementById("commitChart").getContext("2d");
        const currentYear = new Date().getFullYear(); // Usa o ano atual dinamicamente
        const monthlyCommits = new Array(12).fill(0);

        commitsData.forEach((repoStats) => {
            if (Array.isArray(repoStats)) {
                repoStats.forEach((weekData) => {
                    const weekDate = new Date(weekData.week * 1000);
                    if (weekDate.getFullYear() === currentYear) {
                        monthlyCommits[weekDate.getMonth()] += weekData.total;
                    }
                });
            }
        });

        const labels = [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez",
        ];
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Commits",
                        data: monthlyCommits,
                        backgroundColor: (context) =>
                            context.raw > 0 ? "#E54A84" : "transparent",
                        borderColor: (context) =>
                            context.raw > 0 ? "#E54A84" : "transparent",
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
                        filter: (tooltipItem) => tooltipItem.raw > 0,
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
                        grid: { color: "#555" },
                    },
                    x: {
                        ticks: { color: "#aaa" },
                        grid: { color: "transparent" },
                    },
                },
            },
        });
    }

    function renderProfileStats(statsData) {
        const reposEl = document.getElementById("stats-repos");
        const starredEl = document.getElementById("stats-starred");
        const projectsEl = document.getElementById("stats-projects");
        const hoursEl = document.getElementById("stats-hours");

        reposEl.textContent = String(statsData.public_repos).padStart(2, "0");
        starredEl.textContent = String(statsData.starred_count).padStart(
            2,
            "0"
        );
        projectsEl.textContent = String(8).padStart(2, "0"); // Valor manual

        if (statsData.oldest_repo_date) {
            const firstCommitDate = new Date(statsData.oldest_repo_date);
            const today = new Date();
            const diffMilliseconds = today - firstCommitDate;
            const weeksSinceFirstCommit = Math.floor(
                diffMilliseconds / (1000 * 60 * 60 * 24 * 7)
            );
            const totalHours = weeksSinceFirstCommit * 5;
            hoursEl.textContent =
                totalHours > 1000
                    ? (totalHours / 1000).toFixed(1) + "k"
                    : totalHours;
        } else {
            hoursEl.textContent = "0";
        }
    }

    // --- FUNÇÃO PRINCIPAL DE BUSCA ---
    // Faz a única chamada para o nosso backend e distribui os dados para as funções de renderização.
    async function fetchAllGitHubDataAndRender() {
        const langChartContainer = document.querySelector(
            ".chart-doughnut .chart-container"
        );
        const commitChartContainer = document.querySelector(
            ".chart-bar .chart-container"
        );
        langChartContainer.innerHTML =
            '<p style="text-align: center; margin-top: 20px;">Carregando dados...</p>';
        commitChartContainer.innerHTML =
            '<p style="text-align: center; margin-top: 20px;">Calculando estatísticas...</p>';

        try {
            const response = await fetch("/api/github-data");
            if (!response.ok)
                throw new Error(`Erro na API: ${response.statusText}`);

            const data = await response.json();

            // Recria os elementos <canvas> para os gráficos
            langChartContainer.innerHTML =
                '<canvas alt="Gráfico de Pizza" id="languageChart"></canvas>';
            commitChartContainer.innerHTML =
                '<canvas alt="Gráfico de Barras" id="commitChart"></canvas>';

            // Chama as funções para desenhar tudo na tela
            renderLanguageChart(data.languages);
            renderCommitChart(data.commits);
            renderProfileStats(data.stats);
        } catch (error) {
            console.error("Falha ao buscar dados da API:", error);
            langChartContainer.innerHTML =
                '<p style="text-align: center; margin-top: 20px;">Falha ao carregar dados.</p>';
            commitChartContainer.innerHTML =
                '<p style="text-align: center; margin-top: 20px;">Falha ao carregar estatísticas.</p>';
        }
    }

    // --- CARROSSEL ---
    // Seu código do carrossel, copiado exatamente como estava, pois é independente dos dados da API.
    const carousel = document.querySelector(".sidebar-right .carousel");
    const slidesContainer = document.querySelector(".carousel-slides");
    if (slidesContainer && carousel) {
        let slides = Array.from(document.querySelectorAll(".slide"));
        const dots = document.querySelectorAll(".dot");
        let currentIndex = 0;
        let isTransitioning = false;
        let autoScrollInterval;
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);
        slides = Array.from(document.querySelectorAll(".slide"));
        currentIndex = 1;

        function setSizes() {
            const visibleW = carousel.clientWidth;
            slides.forEach((slide) => {
                slide.style.width = `${visibleW}px`;
            });
            slidesContainer.style.transition = "none";
            slidesContainer.style.transform = `translateX(-${
                currentIndex * visibleW
            }px)`;
            void slidesContainer.offsetWidth;
            slidesContainer.style.transition = "transform 0.5s ease-in-out";
        }

        function updateDots(index) {
            dots.forEach((dot) => dot.classList.remove("active"));
            dots[index].classList.add("active");
        }

        function moveToSlide(index) {
            const visibleW = carousel.clientWidth;
            slidesContainer.style.transform = `translateX(-${
                index * visibleW
            }px)`;
            const realIndex = (index - 1 + dots.length) % dots.length;
            updateDots(realIndex);
        }

        function startAutoScroll() {
            clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(() => {
                if (isTransitioning) return;
                isTransitioning = true;
                currentIndex++;
                moveToSlide(currentIndex);
            }, 5000);
        }

        slidesContainer.addEventListener("transitionend", () => {
            isTransitioning = false;
            const visibleW = carousel.clientWidth;
            if (
                slides[currentIndex] &&
                slides[currentIndex].isEqualNode(firstClone)
            ) {
                slidesContainer.style.transition = "none";
                currentIndex = 1;
                slidesContainer.style.transform = `translateX(-${
                    currentIndex * visibleW
                }px)`;
                void slidesContainer.offsetWidth;
                slidesContainer.style.transition = "transform 0.5s ease-in-out";
            } else if (
                slides[currentIndex] &&
                slides[currentIndex].isEqualNode(lastClone)
            ) {
                slidesContainer.style.transition = "none";
                currentIndex = slides.length - 2;
                slidesContainer.style.transform = `translateX(-${
                    currentIndex * visibleW
                }px)`;
                void slidesContainer.offsetWidth;
                slidesContainer.style.transition = "transform 0.5s ease-in-out";
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                if (isTransitioning) return;
                isTransitioning = true;
                currentIndex = index + 1;
                moveToSlide(currentIndex);
                startAutoScroll();
            });
        });

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setSizes, 80);
        });

        setSizes();
        moveToSlide(currentIndex);
        startAutoScroll();
    }

    // --- INICIALIZAÇÃO ---
    // Inicia todo o processo de busca de dados e renderização dos gráficos.
    fetchAllGitHubDataAndRender();
});
