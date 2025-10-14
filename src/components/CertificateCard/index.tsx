import styles from './CertificateCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons';

export type Certificate = {
    id: number;
    title: string;
    issuer: string;
    year: string;
    category: string;
    imageUrl: string;
    certificateUrl: string;
    issueDate: string;
    duration: string;
};

type CertificateCardProps = {
    certificate: Certificate;
};

function CertificateCard({ certificate }: CertificateCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={certificate.imageUrl} alt={`Certificado de ${certificate.title}`} />
                <div className={styles.overlay}>
                    <a href={certificate.certificateUrl} title="Ver certificado" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <FontAwesomeIcon icon={faEye} />
                    </a>
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{certificate.title}</h3>
                <p className={styles.issuer}>{certificate.issuer}</p>
                <div className={styles.divider}></div>
                <div className={styles.details}>
                    <p className={styles.detailItem}>
                        <FontAwesomeIcon icon={faCalendarDay} />
                        <span>{certificate.issueDate}</span>
                    </p>
                    <p className={styles.detailItem}>
                        <FontAwesomeIcon icon={faClock} />
                        <span>{certificate.duration}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CertificateCard;