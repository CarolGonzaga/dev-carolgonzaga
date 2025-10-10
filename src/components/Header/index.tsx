import React from 'react';
import styles from './Header.module.scss';
import logoImg from '../../assets/images/logo-carol-gonzaga.png';
import SidebarToggle from '../SidebarToggle';

type HeaderProps = {
    title: string;
    subtitle?: string;
};

function Header({ title, subtitle }: HeaderProps) {
    return (

        <header className={styles.mainHeader}>
            <SidebarToggle />

            <div className={styles.welcomeMessage}>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>

            <div className={styles.logoWidget}>
                <img src={logoImg} alt="Logotipo de Carol Gonzaga" />
            </div>
        </header>
    );
}

export default Header;