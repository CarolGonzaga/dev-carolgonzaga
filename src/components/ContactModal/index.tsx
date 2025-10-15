import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPaperPlane, faEnvelope, faMapMarkerAlt, faPhone, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import avatarImg from '../../assets/images/avatar.png';

type ContactModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;
        setStatus('sending');

        emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
            .then(() => {
                setStatus('success');
            }, (error) => {
                setStatus('error');
                console.error('FAILED...', error.text);
            });
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStatus('idle');
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={handleClose} aria-label="Fechar modal">
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className={styles.contactModalGrid}>
                    <div className={`${styles.infoPanel} ${isInfoVisible ? styles.infoPanelExpanded : ''}`}>
                        <button
                            className={styles.infoToggle}
                            onClick={() => setIsInfoVisible(!isInfoVisible)}
                            aria-expanded={isInfoVisible}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>

                        <div className={styles.profileInfo}>
                            <img src={avatarImg} alt="Carol Gonzaga" className={styles.avatar} />
                            <h3>Carol Gonzaga</h3>
                            <p>Full Stack Developer</p>
                        </div>

                        <ul className={styles.contactList}>
                            <li>
                                <div className={styles.contactIconWrapper}>
                                    <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                                </div>
                                <div className={styles.contactDetails}>
                                    <span>Email</span>
                                    <p>dev.carolgonzaga@gmail.com</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.contactIconWrapper}>
                                    <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
                                </div>
                                <div className={styles.contactDetails}>
                                    <span>Telefone</span>
                                    <p>(11) 91298-6866</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.contactIconWrapper}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.contactIcon} />
                                </div>
                                <div className={styles.contactDetails}>
                                    <span>Localização</span>
                                    <p>São Paulo, SP</p>
                                </div>
                            </li>
                        </ul>

                        <div className={styles.socialBar}>
                            <a href="https://wa.me/5511912986866" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <FontAwesomeIcon icon={faWhatsapp} />
                            </a>
                            <a href="https://github.com/CarolGonzaga" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="https://www.linkedin.com/in/anacquesta/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.formPanel}>
                        {status === 'idle' || status === 'sending' || status === 'error' ? (
                            <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="user_name">Nome</label>
                                    <input type="text" name="user_name" id="user_name" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="user_company">Empresa</label>
                                    <input type="text" name="user_company" id="user_company" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="user_phone">Telefone</label>
                                    <input type="tel" name="user_phone" id="user_phone" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="user_email">E-mail *</label>
                                    <input type="email" name="user_email" id="user_email" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Mensagem *</label>
                                    <textarea name="message" id="message" rows={4} required></textarea>
                                </div>
                                <button type="submit" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Enviando...' : <>Enviar Mensagem <FontAwesomeIcon icon={faPaperPlane} /></>}
                                </button>
                                {status === 'error' && <p className={styles.errorMessage}>Ocorreu um erro. Por favor, tente novamente.</p>}
                            </form>
                        ) : (
                            <div className={styles.statusMessage}>
                                <h3>Obrigada! ✅</h3>
                                <p>Sua mensagem foi enviada com sucesso. Retornarei em breve.</p>
                                <button onClick={handleClose}>Fechar</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactModal;