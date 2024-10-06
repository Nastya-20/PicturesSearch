import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar.js';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModale/ImageModale';
import { fetchArticles, Image } from '../../articles';
import css from './App.module.css';

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [articles, setArticles] = useState<Image[]>([]); 
  const [topic, setTopic] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null); 
  const [isSearchAttempted, setIsSearchAttempted] = useState<boolean>(false);

  const handleSearch = (newTopic: string) => {
    if (newTopic.trim() === '') {
      toast.error('Please enter a search term.');
      setIsSearchAttempted(false);
      return;
    }
    setTopic(newTopic);
    setPage(1);
    setArticles([]);
    setIsSearchAttempted(true);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => { 
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!isSearchAttempted) return;

    async function getArticles() {
      try {
        setLoading(true);
        setError(false);
        const fetchedArticles = await fetchArticles(topic, page);
        setArticles((prevState) => [...prevState, ...fetchedArticles]);
      } catch {
        setError(true);
        toast.error('Failed to fetch articles: ${err.message}`');
      } finally {
        setLoading(false);
      }
    }

    getArticles();
  }, [page, topic, isSearchAttempted]);

  return (
    <div className={css.container}>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {articles.length > 0 && (
        <>
          <ImageGallery items={articles} onImageClick={openModal} />
          {!loading && !error && (<LoadMoreBtn onClick={handleLoadMore} disabled={loading} />)}
        </>
      )}
      <ImageModal isOpen={modalIsOpen} onClose={closeModal} image={selectedImage} />
    </div>
  );
}





