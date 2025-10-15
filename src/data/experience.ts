export type Experience = {
    id: number;
    date: string;
    title: string;
    company: string;
    details: string[];
};

export const experienceData: Experience[] = [
    {
        id: 1,
        date: "2025 - Atual",
        title: "Analista SAP",
        company: "Numen IT",
        details: [
            "Atuação no desenvolvimento e manutenção de integrações entre sistemas SAP e não SAP utilizando SAP Cloud Platform Integration (CPI).",
            "Criação e configuração de iFlows para automatizar processos e garantir comunicação eficiente entre ambientes.",
            "Implementação e gerenciamento de APIs através do SAP API Management, assegurando segurança, escalabilidade e governança das integrações.",
            "Desenvolvimento e manutenção de CDS Views, contribuindo para a extração e exposição de dados de forma otimizada.",
            "Colaboração com equipes funcionais e técnicas para análise de requisitos e desenho de soluções integradas.",
            "Aplicação de boas práticas de versionamento, documentação e monitoramento de integrações em ambiente SAP BTP.",
        ],
    },
    {
        id: 2,
        date: "2024 - 2025",
        title: "Desenvolvedora Front End",
        company: "Projetos Pessoais e Freelance",
        details: [
            "Desenvolvimento de interfaces responsivas e dinâmicas com React.js, Vue.js e Next.js.",
            "Integração de APIs externas e criação de rotas dinâmicas com Vue Router e Next.js API Routes.",
            "Aplicação de boas práticas de versionamento (Git), componentização e documentação de código.",
            "Utilização de bibliotecas e design mobile-first para experiências otimizadas.",
            "Deploy e manutenção de aplicações em produção com foco em performance e disponibilidade.",
        ],
    },
    {
        id: 3,
        date: "2017 - 2024",
        title: "Sócia Proprietária",
        company: "Lima Limão Baby Store Ltda",
        details: [
            "Gestão completa do e-commerce, incluindo pedidos, estoque e campanhas digitais.",
            "Planejamento e execução de estratégias de marketing digital para aumento de tráfego e conversão em vendas.",
            "Monitoramento de métricas de desempenho e otimização de resultados em plataformas online.",
            "Supervisão de operações administrativas e de atendimento ao cliente.",
        ],
    },
    {
        id: 4,
        date: "2010 - 2016",
        title: "Sócia Proprietária",
        company: "Baby Center Comércio de Fraldas Ltda",
        details: [
            "Administração integral do site e loja virtual, desde o cadastro de produtos até o atendimento ao cliente.",
            "Implementação de ferramentas e automações para otimizar processos operacionais e melhorar o desempenho de vendas.",
            "Coordenação de equipe e definição de estratégias para expansão digital da marca.",
        ],
    },
    {
        id: 5,
        date: "2009 - 2010",
        title: "Auxiliar de Loja",
        company: "União Pereira Assistência Técnica",
        details: [
            "Prestação de suporte técnico básico e atendimento a clientes no ponto de venda.",
            "Elaboração de orçamentos e acompanhamento de assistências técnicas domiciliares.",
            "Apoio na organização do estoque e controle de equipamentos.",
        ],
    },
];
