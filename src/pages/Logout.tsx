import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/_logout.module.scss';
import logoImg from '../assets/images/logo-carol-gonzaga.png';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.logoutContainer}>
            <div className={styles.logoutBox}>
                <img src={logoImg} alt="Logotipo Carol Gonzaga" />
                <h2>Até logo!</h2>
                <p>Sua sessão foi encerrada com segurança.</p>
                <div className={styles.spinner}></div>
            </div>
        </div>
    );
}

export default Logout;