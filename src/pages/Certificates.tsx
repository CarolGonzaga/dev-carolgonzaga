import { useState, useMemo } from 'react';

import Header from '../components/Header';
import CertificateCard from '../components/CertificateCard';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { certificatesData, certificateCategories } from '../data/certificates';
import { badgesData } from '../data/badges';

import styles from '../styles/_certificates.module.scss';

const parseDate = (dateString: string): Date => {
    const months: Record<string, number> = {
        'janeiro': 0, 'fevereiro': 1, 'março': 2, 'abril': 3, 'maio': 4, 'junho': 5,
        'julho': 6, 'agosto': 7, 'setembro': 8, 'outubro': 9, 'novembro': 10, 'dezembro': 11
    };
    const parts = dateString.toLowerCase().split(' de ');
    const month = months[parts[0]];
    const year = parseInt(parts[1], 10);
    return new Date(year, month, 1);
};

const INITIAL_VISIBLE_COUNT = 3;

function Certificates() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCertUrl, setSelectedCertUrl] = useState('');

    const handleOpenModal = (imageUrl: string) => {
        setSelectedCertUrl(imageUrl);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCertUrl('');
    };

    const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

    const handleLoadMore = (category: string) => {
        setVisibleCounts(prevCounts => ({
            ...prevCounts,
            [category]: (prevCounts[category] || INITIAL_VISIBLE_COUNT) + 3
        }));
    };

    const sortedCertificates = useMemo(() => {
        return [...certificatesData].sort((a, b) => {
            if (a.issueDate.toLowerCase() === 'em andamento') return -1;
            if (b.issueDate.toLowerCase() === 'em andamento') return 1;

            const dateA = parseDate(a.issueDate);
            const dateB = parseDate(b.issueDate);
            return dateB.getTime() - dateA.getTime();
        });
    }, []);

    return (
        <>
            <Header title="Certificados & Conquistas" />
            <div className={styles.certificatesContainer}>
                {certificateCategories.map(category => {
                    const certsInCategory = sortedCertificates.filter(cert => cert.category === category);
                    const currentVisibleCount = visibleCounts[category] || INITIAL_VISIBLE_COUNT;

                    if (certsInCategory.length === 0) {
                        return null;
                    }

                    return (
                        <section key={category} className={styles.categorySection}>
                            <h2 className={styles.categoryTitle}>{category}</h2>

                            <div className={styles.certificatesGrid}>
                                {certsInCategory
                                    .slice(0, currentVisibleCount)
                                    .map(cert => (
                                        <CertificateCard key={cert.id} certificate={cert} onCardClick={handleOpenModal} />
                                    ))}
                            </div>

                            {certsInCategory.length > currentVisibleCount && (
                                <div className={styles.loadMoreWrapper}>
                                    <button onClick={() => handleLoadMore(category)} className={styles.loadMoreButton}>
                                        Carregar Mais
                                    </button>
                                </div>
                            )}
                        </section>
                    );
                })}

                <section className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>Conquistas e Badges</h2>
                    <div className={styles.badgesGrid}>
                        {badgesData.map(badge => (
                            <Badge key={badge.id} badge={badge} />
                        ))}
                    </div>
                </section>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                imageUrl={selectedCertUrl}
            />
        </>
    );
}

export default Certificates;