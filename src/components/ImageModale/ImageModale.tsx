import Modal from 'react-modal';
import css from './ImageModale.module.css';
import { Image } from '../../articles';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
}

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onClose, image }: ImageModalProps) {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={onClose} className={css.closeButton}>X</button>
      <img src={image.urls.regular} alt={image.alt_description} className={css.image} />
      <div className={css.details}>
        <p>Author: {image.user.name}</p>
        <p>Likes: {image.likes}</p>
        <p>Description: {image.description}</p>
      </div>
    </Modal>
  );
}

