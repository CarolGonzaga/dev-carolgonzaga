import styles from './Badge.module.scss';

export type Badge = {
    id: number;
    name: string;
    issuer: string;
    imageUrl: string;
    credentialUrl?: string;
};

type BadgeProps = {
    badge: Badge;
};

function Badge({ badge }: BadgeProps) {

    const badgeContent = (
        <div className={styles.badge} title={`${badge.name} - ${badge.issuer}`}>
            <img src={badge.imageUrl} alt={badge.name} />
        </div>
    );

    return badge.credentialUrl ? (
        <a href={badge.credentialUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver credencial de ${badge.name}`}>
            {badgeContent}
        </a>
    ) : (
        badgeContent
    );
}

export default Badge;