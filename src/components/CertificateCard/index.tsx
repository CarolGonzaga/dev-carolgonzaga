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
    onCardClick: (imageUrl: string) => void;
};

function CertificateCard({ certificate, onCardClick }: CertificateCardProps) {
    return (
        <div className={styles.card} onClick={() => onCardClick(certificate.imageUrl)}>
            <div className={styles.imageWrapper}>
                <img src={certificate.imageUrl} alt={`Certificado de ${certificate.title}`} />
                <div className={styles.overlay}>
                    <div className={styles.link}>
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.mainInfo}>
                    <h3 className={styles.title}>{certificate.title}</h3>
                    <p className={styles.issuer}>{certificate.issuer}</p>
                </div>

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