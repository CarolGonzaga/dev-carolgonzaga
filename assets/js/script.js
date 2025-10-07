// Arquivo: assets/js/script.js

document.addEventListener("DOMContentLoaded", () => {
    // Sidebar responsiva
    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("sidebar-toggle");
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    // Adiciona o botão no início do cabeçalho principal
    const mainHeader = document.querySelector(".main-header");
    if (mainHeader) {
        mainHeader.prepend(toggleButton);
    }

    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

    Chart.register(ChartDataLabels);

    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");

    function applyTheme(theme) {
        const isDark = theme === "dark";
        if (isDark) {
            body.setAttribute("data-theme", "dark");
        } else {
            body.removeAttribute("data-theme");
        }
        if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(isDark));
        }
    }

    // Define o tema inicial (salvo ou preferido)
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
        applyTheme(saved);
    } else {
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        applyTheme(prefersDark ? "dark" : "light");
    }

    // Alterna o tema ao clicar no botão
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentlyDark = body.getAttribute("data-theme") === "dark";
            const nextTheme = currentlyDark ? "light" : "dark";
            localStorage.setItem("theme", nextTheme);
            applyTheme(nextTheme);
        });
    }

    function renderLanguageChart(languagesData) {
        const ctx = document.getElementById("languageChart").getContext("2d");
        const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";

        const sortedLangs = Object.entries(languagesData)
            .filter(([lang]) => lang !== "Jupyter Notebook")
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

        const labels = sortedLangs.map(([lang]) => lang);
        const data = sortedLangs.map(([, bytes]) => bytes);

        const backgroundColors = isDark
            ? ["#CA4371", "#BFA8E5", "#4F3D6B", "#E884A8", "#7D6B9E"]
            : ["#CA4371", "#4F3D6B", "#E884A8", "#BFA8E5", "#F9E6EE"];

        new Chart(ctx, {
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
    }

    function renderCommitChart(commitsData) {
        const ctx = document.getElementById("commitChart").getContext("2d");
        const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";
        const currentYear = new Date().getFullYear();
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
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Commits",
                        data: monthlyCommits,
                        borderColor: "#CA4371",
                        backgroundColor: isDark
                            ? "rgba(202, 67, 113, 0.25)"
                            : "rgba(202, 67, 113, 0.15)",
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: isDark ? "#BFA8E5" : "#4F3D6B",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#CA4371",
                        pointHoverBorderColor: "#fff",
                        pointRadius: 5,
                        pointHoverRadius: 7,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    datalabels: { display: false },
                    tooltip: {
                        callbacks: {
                            title: (ctx) => `Mês: ${ctx[0].label}`,
                            label: (ctx) => `${ctx.parsed.y} commits`,
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
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: isDark ? "#B8B1C5" : "#555555" },
                        grid: { color: isDark ? "#3A3A3A" : "#EAEAEA" },
                    },
                    x: {
                        ticks: { color: isDark ? "#B8B1C5" : "#555555" },
                        grid: { color: "transparent" },
                    },
                },
            },
        });
    }

    function renderProfileStats(statsData) {
        const reposEl = document.getElementById("stats-repos");
        // const starredEl = document.getElementById("stats-starred"); // ✨ LINHA REMOVIDA OU AJUSTADA
        const projectsEl = document.getElementById("stats-projects");
        const hoursEl = document.getElementById("stats-hours");

        // ✨ ADICIONADO: Verificações para garantir que os elementos existem antes de tentar manipulá-los
        if (reposEl) {
            reposEl.textContent = String(statsData.public_repos).padStart(
                2,
                "0"
            );
        }

        // if (starredEl) { // Somente se você tiver um elemento com id="stats-starred"
        //     starredEl.textContent = String(statsData.starred_count).padStart(2, "0");
        // } else {
        //     console.warn("Elemento com ID 'stats-starred' não encontrado no DOM.");
        // }

        if (projectsEl) {
            projectsEl.textContent = String(8).padStart(2, "0"); // Valor manual
        }

        if (hoursEl) {
            if (statsData.oldest_repo_date) {
                const firstCommitDate = new Date(statsData.oldest_repo_date);
                const today = new Date();
                const diffMilliseconds = today - firstCommitDate;
                const weeksSinceFirstCommit = Math.floor(
                    diffMilliseconds / (1000 * 60 * 60 * 24 * 7)
                );
                const totalHours = weeksSinceFirstCommit * 5; // Assumindo 5h/semana de trabalho
                hoursEl.textContent =
                    totalHours > 1000
                        ? (totalHours / 1000).toFixed(1) + "k"
                        : totalHours;
            } else {
                hoursEl.textContent = "0";
            }
        }
    }

    async function fetchAllGitHubDataAndRender() {
        // ✨ ALTERADO: Novos seletores CSS para os containers dos gráficos
        const langChartContainer = document.querySelector(
            ".languages-chart-card .chart-container"
        );
        const commitChartContainer = document.querySelector(
            ".commits-chart-card .chart-container"
        );

        // ✨ Melhorando as mensagens de carregamento para refletir o novo estilo
        langChartContainer.innerHTML =
            '<p style="text-align: center; margin-top: 20px; color: var(--texto-secundario);">Carregando dados...</p>';
        commitChartContainer.innerHTML =
            '<p style="text-align: center; margin-top: 20px; color: var(--texto-secundario);">Calculando estatísticas...</p>';

        try {
            const response = await fetch("/api/github-data");
            if (!response.ok)
                throw new Error(`Erro na API: ${response.statusText}`);

            const data = await response.json();

            // Recria os elementos <canvas> para os gráficos
            langChartContainer.innerHTML =
                '<canvas alt="Gráfico de Rosquinha" id="languageChart"></canvas>';
            commitChartContainer.innerHTML =
                '<canvas alt="Gráfico de Barras" id="commitChart"></canvas>';

            renderLanguageChart(data.languages);
            renderCommitChart(data.commits);
            renderProfileStats(data.stats);
        } catch (error) {
            console.error("Falha ao buscar dados da API:", error);
            // ✨ Melhorando as mensagens de erro para refletir o novo estilo
            langChartContainer.innerHTML =
                '<p style="text-align: center; margin-top: 20px; color: red;">Falha ao carregar dados.</p>';
            commitChartContainer.innerHTML =
                '<p style="text-align: center; margin-top: 20px; color: red;">Falha ao carregar estatísticas.</p>';
        }
    }

    // --- CARROSSEL ---

    // 1. Primeiro, selecionamos os elementos-chave do carrossel
    const carousel = document.querySelector(".carousel-card .carousel");
    const slidesContainer = carousel
        ? carousel.querySelector(".carousel-slides")
        : null;

    // 2. Apenas executamos o código se o carrossel for encontrado na página
    if (slidesContainer && carousel) {
        // 3. Declaramos TODAS as variáveis e funções aqui dentro
        let slides = Array.from(slidesContainer.querySelectorAll(".slide"));
        let currentIndex = 0;
        let isTransitioning = false;
        let autoScrollInterval;

        // Clona os slides para o efeito de loop infinito
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);
        slides = Array.from(slidesContainer.querySelectorAll(".slide"));
        currentIndex = 1; // Começa no primeiro slide real

        // Funções principais
        function moveToSlide(index) {
            const visibleW = carousel.clientWidth;
            if (slidesContainer) {
                slidesContainer.style.transform = `translateX(-${
                    index * visibleW
                }px)`;
            }
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

        // --- ATIVAÇÃO DAS SETAS DE NAVEGAÇÃO ---
        const prevButton = carousel.querySelector(".carousel-nav-btn.prev");
        const nextButton = carousel.querySelector(".carousel-nav-btn.next");

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                if (isTransitioning) return;
                isTransitioning = true;
                currentIndex++;
                moveToSlide(currentIndex);
                startAutoScroll();
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                if (isTransitioning) return;
                isTransitioning = true;
                currentIndex--;
                moveToSlide(currentIndex);
                startAutoScroll();
            });
        }

        // --- LÓGICA DO LOOP INFINITO ---
        slidesContainer.addEventListener("transitionend", () => {
            isTransitioning = false;
            const visibleW = carousel.clientWidth;

            if (
                slides[currentIndex] &&
                slides[currentIndex].isEqualNode(firstClone)
            ) {
                slidesContainer.style.transition = "none";
                currentIndex = 1;
                moveToSlide(currentIndex);
                void slidesContainer.offsetWidth; // Força o navegador a aplicar a mudança
                slidesContainer.style.transition = "transform 0.5s ease-in-out";
            }

            if (
                slides[currentIndex] &&
                slides[currentIndex].isEqualNode(lastClone)
            ) {
                slidesContainer.style.transition = "none";
                currentIndex = slides.length - 2;
                moveToSlide(currentIndex);
                void slidesContainer.offsetWidth; // Força o navegador a aplicar a mudança
                slidesContainer.style.transition = "transform 0.5s ease-in-out";
            }
        });

        // --- FUNÇÃO DE RESPONSIVIDADE ---
        function setSizes() {
            const visibleW = carousel.clientWidth;
            slides.forEach((slide) => {
                slide.style.width = `${visibleW}px`;
            });
            slidesContainer.style.transition = "none";
            moveToSlide(currentIndex);
            void slidesContainer.offsetWidth;
            slidesContainer.style.transition = "transform 0.5s ease-in-out";
        }

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setSizes, 250);
        });

        // --- INICIALIZAÇÃO DO CARROSSEL ---
        setSizes();
        startAutoScroll();
    } // Fim do if (slidesContainer && carousel)

    // --- INICIALIZAÇÃO DA PÁGINA ---
    fetchAllGitHubDataAndRender();
});
