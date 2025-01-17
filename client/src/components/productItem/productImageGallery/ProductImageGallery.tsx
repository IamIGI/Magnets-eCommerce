import React, { useState } from 'react';
import c from './ProductImageGallery.module.scss';

interface ImageGalleryProps {
  imgSrc: string[];
}

const ProductImageGallery: React.FC<ImageGalleryProps> = ({ imgSrc }) => {
  const [selectedImage, setSelectedImage] = useState<string>(imgSrc[0]);

  return (
    <div className={c.wrapper}>
      <div className={c.thumbnailColumn}>
        {imgSrc.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className={`${c.thumbnail} ${
              selectedImage === src ? c.selected : ''
            }`}
            onClick={() => setSelectedImage(src)}
          />
        ))}
      </div>
      <div className={c.mainImageColumn}>
        <img src={selectedImage} alt="Selected" className={c.mainImage} />
      </div>
    </div>
  );
};

export default ProductImageGallery;
