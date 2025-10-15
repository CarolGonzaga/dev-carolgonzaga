export type EducationItem = {
    id: number;
    date: string;
    title: string;
    institution: string;
    category: "Formação" | "Curso";
};

export const educationData: EducationItem[] = [
    // --- FORMAÇÃO ---
    {
        id: 1,
        date: "2025 - 2026 | Pós Graduação",
        title: "Desenvolvimento Full Stack",
        institution: "FIAP",
        category: "Formação",
    },
    {
        id: 2,
        date: "2022 - 2024 | Graduação",
        title: "Sistemas para Internet",
        institution: "SENAC",
        category: "Formação",
    },

    // --- CURSOS ---
    {
        id: 3,
        date: "2023 - 2024",
        title: "FrontEnd Master",
        institution: "DevSamurai",
        category: "Curso",
    },
    {
        id: 4,
        date: "2007 - 2007",
        title: "Montagem e Manutenção de Micros",
        institution: "SENAI",
        category: "Curso",
    },
    {
        id: 5,
        date: "2003 - 2007",
        title: "Técnico em Computação Jr",
        institution: "CEDASPY",
        category: "Curso",
    },
];
