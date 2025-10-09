import styles from './Sidebar.module.scss';

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faUserTie,
    faProjectDiagram,
    faAward,
    faEnvelope,
    faFileArrowDown,
    faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

import avatarImg from '../../assets/images/avatar.png';
import cvFile from '../../assets/docs/CVAnaCarolineGonzaga.pdf';
import ThemeToggleButton from '../ThemeToggleButton';

function Sidebar() {
    return (
        <aside className={styles.sidebar}>

            <div className={styles['sidebar-header']}>
                <div className={styles['sidebar-profile']}>
                    <div className={styles['avatar-wrapper']}>
                        <img src={avatarImg} alt="Foto de Carol Gonzaga" className={styles['profile-avatar']} />
                    </div>
                    <h2 className={styles['profile-name']}>Carol Gonzaga</h2>
                    <p className={styles['profile-role']}>Full Stack Developer</p>
                </div>
            </div>

            <nav className={styles['sidebar-nav']} role="navigation" aria-label="Navegação principal">

                <ul className={styles['menu-section']}>
                    <li className={styles['section-title']}>Geral</li>

                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? `${styles['nav-link']} ${styles.active}` : styles['nav-link']}>
                            <FontAwesomeIcon icon={faChartLine} className={styles.icon} aria-hidden="true" />
                            <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/resumo" className={({ isActive }) => isActive ? `${styles['nav-link']} ${styles.active}` : styles['nav-link']}>
                            <FontAwesomeIcon icon={faUserTie} className={styles.icon} aria-hidden="true" />
                            <span>Resumo</span>
                        </NavLink>
                    </li>

                    <li>
                        <a href="#portfolio" className={styles['nav-link']}>
                            <FontAwesomeIcon icon={faProjectDiagram} className={styles.icon} aria-hidden="true" />
                            <span>Portfólio</span>
                        </a>
                    </li>

                    <li>
                        <a href="#certificados" className={styles['nav-link']}>
                            <FontAwesomeIcon icon={faAward} className={styles.icon} aria-hidden="true" />
                            <span>Certificados</span>
                        </a>
                    </li>
                </ul>

                <ul className={styles['menu-section']}>
                    <li className={styles['section-title']}>Extras</li>

                    <li>
                        <a href="#contato" className={styles['nav-link']}>
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} aria-hidden="true" />
                            <span>Contato</span>
                        </a>
                    </li>

                    <li>
                        <a href={cvFile} className={styles['nav-link']} download>
                            <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} aria-hidden="true" />
                            <span>Baixar Currículo</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className={styles['sidebar-footer']}>
                <div className={styles['footer-actions']}>
                    <button className={styles['btn-logout']} onClick={() => window.location.href = 'logout.html'}
                        aria-label="Sair do sistema">
                        <FontAwesomeIcon icon={faRightFromBracket} className={styles.icon} aria-hidden="true" />
                        <span>Sair</span>
                    </button>

                    <ThemeToggleButton />
                </div>

                <p className={styles['copyright-footer']}>© 2025 Carol Gonzaga</p>
            </div>
        </aside>
    );
}

export default Sidebar;