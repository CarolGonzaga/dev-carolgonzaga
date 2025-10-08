import avatarImg from '../assets/images/avatar.png';
import cvFile from '../assets/docs/CVAnaCarolineGonzaga.pdf';
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

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-header">
                <div className="sidebar-profile">
                    <div className="avatar-wrapper">
                        <img src={avatarImg} alt="Foto de Carol Gonzaga" className="profile-avatar" />
                    </div>
                    <h2 className="profile-name">Carol Gonzaga</h2>
                    <p className="profile-role">Full Stack Developer</p>
                </div>
            </div>

            <nav className="sidebar-nav" role="navigation" aria-label="Navegação principal">

                <ul className="menu-section">
                    <li className="section-title">Geral</li>

                    <li>
                        <a href="#home" className="nav-link active" aria-current="page">
                            <FontAwesomeIcon icon={faChartLine} className="sidebar-icon" aria-hidden="true" />
                            <span>Home</span>
                        </a>
                    </li>

                    <li>
                        <a href="#resumo" className="nav-link">
                            <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" aria-hidden="true" />
                            <span>Resumo</span>
                        </a>
                    </li>

                    <li>
                        <a href="#portfolio" className="nav-link">
                            <FontAwesomeIcon icon={faProjectDiagram} className="sidebar-icon" aria-hidden="true" />
                            <span>Portfólio</span>
                        </a>
                    </li>

                    <li>
                        <a href="#certificados" className="nav-link">
                            <FontAwesomeIcon icon={faAward} className="sidebar-icon" aria-hidden="true" />
                            <span>Certificados</span>
                        </a>
                    </li>
                </ul>

                <ul className="menu-section">
                    <li className="section-title">Extras</li>

                    <li>
                        <a href="#contato" className="nav-link">
                            <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" aria-hidden="true" />
                            <span>Contato</span>
                        </a>
                    </li>

                    <li>
                        <a href={cvFile} className="nav-link" download>
                            <FontAwesomeIcon icon={faFileArrowDown} className="sidebar-icon" aria-hidden="true" />
                            <span>Baixar Currículo</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="footer-actions">
                    <button className="btn-logout" onClick={() => window.location.href = 'logout.html'}
                        aria-label="Sair do sistema">
                        <FontAwesomeIcon icon={faRightFromBracket} className="sidebar-icon" aria-hidden="true" />
                        <span>Sair</span>
                    </button>

                    <button className="theme-toggle-btn" id="theme-toggle" aria-label="Alternar entre modo claro e escuro"
                        aria-pressed="false" title="Alterar Tema">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="hero-icon icon-sun">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="hero-icon icon-moon">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    </button>
                </div>

                <p className="copyright-footer">© 2025 Carol Gonzaga</p>
            </div>
        </aside>
    );
}

export default Sidebar;