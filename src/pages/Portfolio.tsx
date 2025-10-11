import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import PortfolioCard from '../components/PortfolioCard';
import type { Project } from '../components/PortfolioCard';
import styles from '../styles/_portfolio.module.scss';

const projectsData: Project[] = [
    {
        id: 1,
        title: 'Perfil de Viagens',
        category: 'Nível Básico',
        imageUrl: '/images/portfolio/basico/perfilViagem.jpg',
        projectUrl: 'https://carolgonzaga.github.io/perfil-de-viagens/',
        repoUrl: 'https://github.com/CarolGonzaga/perfil-de-viagens'
    },
    {
        id: 2,
        title: 'Portal de Notícias',
        category: 'Nível Básico',
        imageUrl: '/images/portfolio/basico/portalNoticias.jpg',
        projectUrl: 'https://carolgonzaga.github.io/portal-de-noticias/',
        repoUrl: 'https://github.com/CarolGonzaga/portal-de-noticias'
    },
    {
        id: 3,
        title: 'Landing Page Portfólio Dev',
        category: 'Nível Básico',
        imageUrl: '/images/portfolio/basico/portDev1.jpg',
        projectUrl: 'https://carolgonzaga.github.io/portfolio-dev/',
        repoUrl: 'https://github.com/CarolGonzaga/portfolio-dev'
    },
    {
        id: 4,
        title: 'Formulário Convite',
        category: 'Nível Básico',
        imageUrl: '/images/portfolio/basico/formConvite.jpg',
        projectUrl: 'https://carolgonzaga.github.io/formulario-de-convite/',
        repoUrl: 'https://github.com/CarolGonzaga/formulario-de-convite'
    },
    {
        id: 5,
        title: 'Landing Page Zingen',
        category: 'Nível Básico',
        imageUrl: '/images/portfolio/basico/lpProduto.jpg',
        projectUrl: 'https://carolgonzaga.github.io/landing-page-de-aplicativo/',
        repoUrl: 'https://github.com/CarolGonzaga/landing-page-de-aplicativo'
    },
    {
        id: 6,
        title: 'Formulário Matrícula',
        category: 'Nível Básico',
        imageUrl: '/images/portfolio/basico/formMatricula.jpg',
        projectUrl: 'https://carolgonzaga.github.io/formulario-de-matricula/',
        repoUrl: 'https://github.com/CarolGonzaga/formulario-de-matricula'
    },
    {
        id: 7,
        title: 'Landing Page Snitap',
        category: 'Nível Básico',
        imageUrl: '/images/portfolio/basico/lpAnimado2.jpg',
        projectUrl: 'https://carolgonzaga.github.io/landing-page-animado/',
        repoUrl: 'https://github.com/CarolGonzaga/landing-page-animado'
    },
    {
        id: 8,
        title: 'Landing Page Clube de Assinatura',
        category: 'Nível Básico',
        imageUrl: '/images/portfolio/basico/lpAnimado.jpg',
        projectUrl: 'https://carolgonzaga.github.io/lp-clube-de-assinaturas/',
        repoUrl: 'https://github.com/CarolGonzaga/lp-clube-de-assinaturas'
    },
    {
        id: 9,
        title: 'Landing Page Portfólio Dev',
        category: 'Nível Básico',
        imageUrl: '/images/portfolio/basico/portDev2.jpg',
        projectUrl: 'https://carolgonzaga.github.io/',
        repoUrl: 'https://github.com/CarolGonzaga/carolgonzaga.github.io'
    },

    {
        id: 10,
        title: 'Listagem de Pokémons',
        category: 'Nível Intermediário',
        imageUrl: '/images/portfolio/intermediario/pokedex.jpg',
        projectUrl: 'https://carolgonzaga.github.io/projeto-pokedex/',
        repoUrl: 'https://github.com/CarolGonzaga/projeto-pokedex'
    },
    {
        id: 11,
        title: 'Conversor de Moedas',
        category: 'Nível Intermediário',
        imageUrl: '/images/portfolio/intermediario/conversor.jpg',
        projectUrl: 'https://carolgonzaga.github.io/conversor-de-moedas/',
        repoUrl: 'https://github.com/CarolGonzaga/conversor-de-moedas'
    },
    {
        id: 12,
        title: 'Lista de Compras',
        category: 'Nível Intermediário',
        imageUrl: '/images/portfolio/intermediario/listaCompras.jpg',
        projectUrl: 'https://carolgonzaga.github.io/lista-de-compras/',
        repoUrl: 'https://github.com/CarolGonzaga/lista-de-compras'
    },
    {
        id: 13,
        title: 'Solicitação de Reembolso',
        category: 'Nível Intermediário',
        imageUrl: '/images/portfolio/intermediario/reembolso.jpg',
        projectUrl: 'https://carolgonzaga.github.io/refund-reembolso/',
        repoUrl: 'https://github.com/CarolGonzaga/refund-reembolso'
    },
    {
        id: 14,
        title: 'Gerador de Senhas',
        category: 'Nível Intermediário',
        imageUrl: '/images/portfolio/intermediario/senhador.jpg',
        projectUrl: 'https://carolgonzaga.github.io/projeto-senhador/',
        repoUrl: 'https://github.com/CarolGonzaga/projeto-senhador'
    },
    {
        id: 15,
        title: 'Lista de Tarefas Gameficada',
        category: 'Nível Intermediário',
        imageUrl: '/images/portfolio/intermediario/pontua.jpg',
        projectUrl: 'https://carolgonzaga.github.io/projeto-pontua-ai/',
        repoUrl: 'https://github.com/CarolGonzaga/projeto-pontua-ai'
    },
    {
        id: 16,
        title: 'Sorteador de Números',
        category: 'Nível Intermediário',
        imageUrl: '/images/portfolio/intermediario/sorteador.jpg',
        projectUrl: 'https://carolgonzaga.github.io/sorteador-de-numeros/',
        repoUrl: 'https://github.com/CarolGonzaga/sorteador-de-numeros'
    },

    {
        id: 17,
        title: 'Poké Agenda',
        category: 'Nível Avançado',
        imageUrl: '/images/portfolio/avancado/pokedex.jpg',
        projectUrl: 'https://carolgonzaga.github.io/desafio-dio-pokedex/',
        repoUrl: 'https://github.com/CarolGonzaga/desafio-dio-pokedex'
    },
    {
        id: 18,
        title: 'Controle de Pedidos Hamburgueria',
        category: 'Nível Avançado',
        imageUrl: '/images/portfolio/avancado/burguer.jpg',
        projectUrl: 'https://projeto-madameburger.vercel.app/',
        repoUrl: 'https://github.com/CarolGonzaga/projeto-MadameBurger'
    },
    {
        id: 19,
        title: 'Agendamento Hair Day',
        category: 'Nível Avançado',
        imageUrl: '/images/portfolio/avancado/apiHair.jpg',
        projectUrl: 'https://hairday-agendamento.vercel.app/',
        repoUrl: 'https://github.com/CarolGonzaga/hairday-agendamento'
    },
    {
        id: 20,
        title: 'Agendamento Mundo Pet',
        category: 'Nível Avançado',
        imageUrl: '/images/portfolio/avancado/apiPetShop.jpg',
        projectUrl: 'https://petshop-agendamento.vercel.app/',
        repoUrl: 'https://github.com/CarolGonzaga/petshop-agendamento'
    },
    {
        id: 21,
        title: 'Rede Social',
        category: 'Nível Avançado',
        imageUrl: '/images/portfolio/avancado/social.jpg',
        projectUrl: 'https://social-keen.vercel.app/login',
        repoUrl: 'https://github.com/CarolGonzaga/projeto-RedeSocialKeen'
    },

    {
        id: 22,
        title: 'Detona Ralph',
        category: 'Jogos',
        imageUrl: '/images/portfolio/jogos/ralph.jpg',
        projectUrl: 'https://carolgonzaga.github.io/desafio-detona-ralph/',
        repoUrl: 'https://github.com/CarolGonzaga/desafio-detona-ralph'
    },
    {
        id: 23,
        title: 'Jokenpô Yu-Gi-Oh!',
        category: 'Jogos',
        imageUrl: '/images/portfolio/jogos/yugioh.jpg',
        projectUrl: 'https://carolgonzaga.github.io/desafio-dio-yugioh/',
        repoUrl: 'https://github.com/CarolGonzaga/desafio-dio-yugioh'
    },
    {
        id: 24,
        title: 'Jogo da Memória',
        category: 'Jogos',
        imageUrl: '/images/portfolio/jogos/memoria.jpg',
        projectUrl: 'https://carolgonzaga.github.io/desafio-jogo-da-memoria/',
        repoUrl: 'https://github.com/CarolGonzaga/desafio-jogo-da-memoria'
    },
    {
        id: 25,
        title: 'MIDI Box',
        category: 'Jogos',
        imageUrl: '/images/portfolio/jogos/piano.jpg',
        projectUrl: 'https://carolgonzaga.github.io/desafio-dio-teclado-musical/',
        repoUrl: 'https://github.com/CarolGonzaga/desafio-dio-teclado-musical'
    },
    {
        id: 26,
        title: 'Mortal Fight in Turns',
        category: 'Jogos',
        imageUrl: '/images/portfolio/jogos/fight.jpg',
        projectUrl: 'https://carolgonzaga.github.io/projeto-mortal-fight/',
        repoUrl: 'https://github.com/CarolGonzaga/projeto-mortal-fight'
    },
    {
        id: 27,
        title: 'Jogo da Velha',
        category: 'Jogos',
        imageUrl: '/images/portfolio/jogos/velha.jpg',
        projectUrl: 'https://projeto-jogo-da-velha-eight.vercel.app/',
        repoUrl: 'https://github.com/CarolGonzaga/projeto-JogoDaVelha'
    },
    {
        id: 28,
        title: 'Super Trunfo Vilões',
        category: 'Jogos',
        imageUrl: '/images/portfolio/jogos/trunfo.jpg',
        projectUrl: 'https://carolgonzaga.github.io/projeto-trunfodoterror/',
        repoUrl: 'https://github.com/CarolGonzaga/projeto-trunfodoterror'
    },
    {
        id: 29,
        title: 'Criptmojis Descubra a Senha',
        category: 'Jogos',
        imageUrl: '/images/portfolio/jogos/cripmojis.jpg',
        projectUrl: 'https://projeto-criptmojis.vercel.app/',
        repoUrl: 'https://github.com/CarolGonzaga/projeto-criptmojis'
    },
];

const filters = ['Todos', 'Nível Básico', 'Nível Intermediário', 'Nível Avançado', 'Jogos'];

function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'Todos') {
            return projectsData;
        }
        return projectsData.filter(p => p.category === activeFilter);
    }, [activeFilter]);

    return (
        <>
            <Header title="Portfólio" />

            <nav className={styles.portfolioFilters}>
                {filters.map(filter => (
                    <button
                        key={filter}
                        className={activeFilter === filter ? styles.active : ''}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </nav>

            <div className={styles.portfolioContainer}>
                <section className={styles.portfolioGrid}>
                    {filteredProjects.map(project => (
                        <PortfolioCard key={project.id} project={project} />
                    ))}
                </section>
            </div>
        </>
    );
}

export default Portfolio;