import React from 'react';
import styles from './PortfolioCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export type Project = {
    id: number;
    title: string;
    category: 'Nível Básico' | 'Nível Intermediário' | 'Nível Avançado' | 'Jogos';
    imageUrl: string;
    projectUrl: string;
    repoUrl: string;
};

type PortfolioCardProps = {
    project: Project;
};

function PortfolioCard({ project }: PortfolioCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={project.imageUrl} alt={`Imagem do projeto ${project.title}`} />
                <div className={styles.overlay}>
                    {/* 3. ADICIONADO CONTAINER PARA OS LINKS */}
                    <div className={styles.linksWrapper}>
                        <a href={project.projectUrl} title="Ver projeto" target="_blank" rel="noopener noreferrer" className={styles.link}>
                            <FontAwesomeIcon icon={faEye} />
                        </a>
                        <a href={project.repoUrl} title="Ver repositório" target="_blank" rel="noopener noreferrer" className={styles.link}>
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.category}>{project.category}</p>
            </div>
        </div>
    );
}

export default PortfolioCard;