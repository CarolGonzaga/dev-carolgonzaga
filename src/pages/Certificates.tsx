import { useState, useRef } from 'react';

import Header from '../components/Header';
import CertificateCard from '../components/CertificateCard';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { certificatesData, certificateCategories } from '../data/certificates';
import { badgesData } from '../data/badges';

import styles from '../styles/_certificates.module.scss';

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

    const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleScroll = (category: string, direction: 'left' | 'right') => {
        const container = scrollRefs.current[category];
        if (container) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <>
            <Header title="Certificados & Conquistas" />

            <div className={styles.certificatesContainer}>
                {certificateCategories.map(category => {
                    const certsInCategory = certificatesData.filter(cert => cert.category === category);
                    const useHorizontalScroll = certsInCategory.length > 3;

                    return (
                        <section key={category} className={styles.categorySection}>
                            <h2 className={styles.categoryTitle}>{category}</h2>
                            {useHorizontalScroll ? (
                                <div className={styles.horizontalScrollWrapper}>
                                    <button onClick={() => handleScroll(category, 'left')} className={`${styles.scrollArrow} ${styles.left}`}>‹</button>
                                    <div
                                        className={styles.horizontalScrollContent}
                                        ref={el => { scrollRefs.current[category] = el; }}
                                    >
                                        {certsInCategory.map(cert => (
                                            <div key={cert.id} className={styles.horizontalItem}>
                                                <CertificateCard certificate={cert} onCardClick={handleOpenModal} />
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => handleScroll(category, 'right')} className={`${styles.scrollArrow} ${styles.right}`}>›</button>
                                </div>
                            ) : (
                                <div className={styles.certificatesGrid}>
                                    {certsInCategory.map(cert => (
                                        <CertificateCard key={cert.id} certificate={cert} onCardClick={handleOpenModal} />
                                    ))}
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