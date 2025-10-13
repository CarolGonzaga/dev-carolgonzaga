import { useState, useMemo } from 'react';
import Header from '../components/Header';
import PortfolioCard from '../components/PortfolioCard';
import { projectsData, filters } from '../data/projects';
import styles from '../styles/_portfolio.module.scss';

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