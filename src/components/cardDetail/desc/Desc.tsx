import unliked from '../../../assets/main/unliked.svg'
import liked from '../../../assets/main/liked.svg'
import { DescProps } from '../../../shared/api/types'
import styles from './styles.module.css'
import { ButtonFavAndBasket } from '../../buttonFavAndBasket'
import React, { useState } from 'react'

export const Desc: React.FC<DescProps> = ({ product, onBasketClick, onFavoriteClick, isFavorite, isInBasket, images }) => {
  let imageArray: string[] = []

  if (typeof images === 'string') {
    imageArray = [images]
  } else if (Array.isArray(images)) {
    imageArray = images
  }

  if (!imageArray || imageArray.length === 0) {
    return null
  }

  const [selectedImage, setSelectedImage] = useState(imageArray[0])

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  return (
    <section className={styles.desc}>
      <div className={styles.imagesGallery}>
        {imageArray.map((image, index) => (
          <img key={index} src={image} alt={`photo number ${index}`} className={styles.image} onClick={() => handleImageClick(image)} />
        ))}
      </div>

      <div className={styles.mainImage}>
        <img src={selectedImage} alt="Main" className={styles.selectedImage} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <ButtonFavAndBasket className={styles.favorites} item={product} typeButton="favorites" onButtonClick={onFavoriteClick}>
          <img src={isFavorite ? liked : unliked} alt={isFavorite ? liked : unliked} />
        </ButtonFavAndBasket>
        <ButtonFavAndBasket className={styles.basket} item={product} typeButton="basket" onButtonClick={onBasketClick}>
          {isInBasket ? 'Remove from cart' : 'Add to cart'}
        </ButtonFavAndBasket>
        <div className={styles.sizesContainer}>
          {product.size.map((item, index) => (
            <p className={styles.size} key={index}>
              {item}
            </p>
          ))}
        </div>
        <div className={styles.characteristics}>
          <span className={styles.characteristics__title}>Product Information:</span>
          <div className={styles.characteristics__structure}>{`Fabric composition: ${product['fabric structure']}`}</div>
          {product['fabric density'] ? <div className={styles.characteristics__density}>{`Fabric density: ${product['fabric density']}`}</div> : null}
          {product['washing instructions'] ? <span className={styles.characteristics__recommendation}>{product['washing instructions']}</span> : null}
        </div>
        <span className={styles.price}>{`BYN ${product.price}`}</span>
        <p className={styles.description}>{product.desc}</p>
      </div>
    </section>
  )
}
