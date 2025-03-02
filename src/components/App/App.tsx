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
  const [hasMore, setHasMore] = useState<boolean>(true);

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
    setHasMore(true);
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

        if (fetchedArticles.length === 0) {
          setHasMore(false); 
          return;
        }

        setArticles((prevState) => [...prevState, ...fetchedArticles]);
      } catch (error) {
        setError(true);

        if (error instanceof Error) {
          toast.error(`Failed to fetch articles: ${error.message}`);
        } else {
          toast.error('An unknown error occurred.');
        }
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
          {!loading && !error && hasMore && (
            <LoadMoreBtn onClick={handleLoadMore} disabled={loading} />)}
        </>
      )}
      <ImageModal isOpen={modalIsOpen} onClose={closeModal} image={selectedImage} />
    </div>
  );
}





