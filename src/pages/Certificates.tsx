import Header from '../components/Header';
import CertificateCard from '../components/CertificateCard';
import Badge from '../components/Badge';
import { certificatesData, certificateCategories } from '../data/certificates';
import { badgesData } from '../data/badges';
import styles from '../styles/_certificates.module.scss';

function Certificates() {
    return (
        <>
            <Header title="Certificados & Conquistas" />

            <div className={styles.certificatesContainer}>
                {certificateCategories.map(category => (
                    <section key={category} className={styles.categorySection}>
                        <h2 className={styles.categoryTitle}>{category}</h2>
                        <div className={styles.certificatesGrid}>
                            {certificatesData
                                .filter(cert => cert.category === category)
                                .map(cert => (
                                    <CertificateCard key={cert.id} certificate={cert} />
                                ))}
                        </div>
                    </section>
                ))}

                <section className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>Conquistas e Badges</h2>
                    <div className={styles.badgesGrid}>
                        {badgesData.map(badge => (
                            <Badge key={badge.id} badge={badge} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default Certificates;