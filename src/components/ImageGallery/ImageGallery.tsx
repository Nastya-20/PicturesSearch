import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../../articles';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  items: Image[]; 
  onImageClick: (image: Image) => void; 
}

export default function ImageGallery({ items, onImageClick }: ImageGalleryProps) {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li key={item.id} className={css.item}>
          <ImageCard item={item} onClick={() => onImageClick(item)} />
        </li>
      ))}
    </ul>
  );
}


