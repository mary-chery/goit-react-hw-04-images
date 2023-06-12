import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPictures } from '../api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from 'components/Loader/Loader';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  useEffect(() => {
    fetchImages();
  }, [searchQuery, currentPage]);

  const fetchImages = async () => {
    setIsLoading(true);
    const { hits, totalHits } = await fetchPictures(searchQuery, currentPage);
    setImages(prevImages => [...prevImages, ...hits]);
    setHasMoreImages(currentPage < Math.ceil(totalHits / 12));
    setIsLoading(false);
  };

  const handleSearch = searchQuery => {
    setImages([]);
    setSearchQuery(searchQuery.trim());
    setCurrentPage(1);
    setHasMoreImages(false);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageUrl => {
    setShowModal(true);
    setModalImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageUrl('');
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {searchQuery && (
        <ImageGallery
          images={images}
          isLoading={isLoading}
          onImageClick={handleImageClick}
        />
      )}
      {showModal && (
        <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />
      )}
      {hasMoreImages && searchQuery && <Button onClick={handleLoadMore} />}
    </div>
  );
}

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     currentPage: 1,
//     isLoading: false,
//     hasMoreImages: false,
//     showModal: false,
//     modalImageUrl: '',
//     totalHits: 0,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const newQuery = this.state.searchQuery;
//     const newPage = this.state.currentPage;

//     if (
//       prevState.searchQuery !== this.state.searchQuery ||
//       prevState.currentPage !== this.state.currentPage
//     ) {
//       this.fetchPictures(newQuery, newPage);
//     }
//   }

//   fetchPictures = async () => {
//     this.setState({ isLoading: true });
//     const { searchQuery, currentPage } = this.state;
//     const { hits, totalHits } = await fetchPictures(searchQuery, currentPage);

//     this.setState(prevState => ({
//       images: [...prevState.images, ...hits],
//       hasMoreImages: this.state.currentPage < Math.ceil(totalHits / 12),
//     }));
//     this.setState({ isLoading: false });
//   };

//   handleSearch = searchQuery => {
//     this.setState({
//       images: [],
//       searchQuery: searchQuery.trim(),
//       currentPage: 1,
//       hasMoreImages: false,
//     });
//   };

//   handleLoadMore = () => {
//     this.setState(
//       prevState => ({
//         currentPage: prevState.currentPage + 1,
//       }),
//       () => {
//         // this.fetchPictures();
//       }
//     );
//   };

//   handleImageClick = imageUrl => {
//     this.setState({ showModal: true, modalImageUrl: imageUrl });
//   };

//   handleCloseModal = () => {
//     this.setState({ showModal: false, modalImageUrl: '' });
//   };

//   render() {
//     const {
//       images,
//       isLoading,
//       hasMoreImages,
//       showModal,
//       modalImageUrl,
//       // totalHits,
//     } = this.state;

//     return (
// <div>
//   <Searchbar onSearch={this.handleSearch} />
//   {isLoading && <Loader />}
//   <ImageGallery
//     images={images}
//     isLoading={isLoading}
//     onImageClick={this.handleImageClick}
//   />
//   {showModal && (
//     <Modal imageUrl={modalImageUrl} onClose={this.handleCloseModal} />
//   )}
//   {hasMoreImages && <Button onClick={this.handleLoadMore} />}
// </div>
//     );
//   }
// }
