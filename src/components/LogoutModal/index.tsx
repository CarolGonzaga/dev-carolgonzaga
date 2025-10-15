import styles from './LogoutModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';

type LogoutModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Fechar modal">
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>

                <h3>Saindo?</h3>
                <p>Você tem certeza que deseja encerrar a sessão?</p>

                <div className={styles.buttonGroup}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Sim, Sair
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutModal;