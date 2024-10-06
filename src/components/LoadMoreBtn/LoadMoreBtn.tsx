import React from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, disabled = false }) => {
  return (
    <button type="button" className={css.loadMore} onClick={onClick} disabled={disabled} >
      Load More
    </button>
  );
};

export default LoadMoreBtn;
