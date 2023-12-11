import { useState } from 'react'
import styles from './style.module.css'
import { ProductImageCarouselProps } from '../../shared/api/types'

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length)
  }
  let displayImages: string[] = []
  if (images.length >= 3) {
    displayImages = [
      images[(currentImageIndex - 1 + images.length) % images.length],
      images[currentImageIndex],
      images[(currentImageIndex + 1) % images.length],
    ]
  } else if (images.length === 2) {
    displayImages = [images[currentImageIndex], images[(currentImageIndex + 1) % images.length]]
  } else {
    displayImages = [images[currentImageIndex]]
  }

  return (
    <div className={styles.carousel}>
      {displayImages.length >= 2 ? (
        <div className={styles.imageContainer}>
          <button className={styles.button} onClick={handlePrevImage}>
            {'<'}
          </button>
          {displayImages.map((image, index) => (
            <img
              width={400}
              height={400}
              key={index}
              className={`${index === 1 ? styles.centralImage : styles.additionalImage}`}
              src={image}
              alt={`Image of product`}
              onClick={() => (index === 1 ? handleNextImage() : handlePrevImage())}
            />
          ))}
          <button className={styles.button} onClick={handleNextImage}>
            {'>'}
          </button>
        </div>
      ) : (
        <div className={styles.imageContainer}>
          {displayImages.map((image, index) => (
            <img key={index} className={styles.centralImage} src={image} alt={`Image of product`} />
          ))}
        </div>
      )}
    </div>
  )
}
