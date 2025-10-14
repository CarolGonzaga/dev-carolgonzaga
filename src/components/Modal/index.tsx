import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
};

function Modal({ isOpen, onClose, imageUrl }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Fechar modal">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <img src={imageUrl} alt="Visualização do certificado" />
            </div>
        </div>
    );
}

export default Modal;