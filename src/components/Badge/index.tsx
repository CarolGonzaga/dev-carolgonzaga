import styles from './Badge.module.scss';

export type Badge = {
    id: number;
    name: string;
    issuer: string;
    imageUrl: string;
};

type BadgeProps = {
    badge: Badge;
};

function Badge({ badge }: BadgeProps) {
    return (
        <div className={styles.badge} title={`${badge.name} - ${badge.issuer}`}>
            <img src={badge.imageUrl} alt={badge.name} />
        </div>
    );
}

export default Badge;