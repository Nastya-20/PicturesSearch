import React from 'react';
import css from './ImageCard.module.css';

interface ImageUrls {
    small: string;
}

interface ImageItem {
    urls: ImageUrls;
    alt_description: string;
}

interface ImageCardProps {
    item: ImageItem;
    onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, onClick }) => {
  return (
    <div className={css.wrap} onClick={onClick}>
      <img src={item.urls.small} alt={item.alt_description} />
    </div>
  );
};

export default ImageCard;