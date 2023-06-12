// import Loader from 'components/Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery({ images, isLoading, onImageClick }) {
  return (
    <div>
      <ul className={css.ImageGallery}>
        {images.map(({ webformatURL, largeImageURL }, index) => (
          <ImageGalleryItem
            key={index}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={() => onImageClick(largeImageURL)}
          />
        ))}
      </ul>
    </div>
  );
}
