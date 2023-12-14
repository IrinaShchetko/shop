import unliked from '../../assets/main/unliked.svg'
import liked from '../../assets/main/liked.svg'
import loupe from '../../assets/main/loupe.svg'
import styles from './styles.module.css'
import { CardProductProps } from '../../shared/api/types'
import { ButtonFavAndBasket } from '../buttonFavAndBasket/index'
import { useState } from 'react'
import { Modal } from '../modal'
import { ProductImageCarousel } from '../productImageCarousel'
import { Link } from 'react-router-dom'

export const CardProduct: React.FC<CardProductProps> = ({ item, onFavoriteClick, onBasketClick, isFavorite = false, isInBasket = false }) => {
  const firstImage = Array.isArray(item.images) ? item.images[0] : item.images
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const toggleImageModal = () => {
    setIsImageModalOpen(!isImageModalOpen)
  }

  return (
    <div className={styles.product}>
      <Link key={item._id} to={`/desc/${item._id}`}>
        <img className={styles.img} src={firstImage} alt={item.title} />
      </Link>
      <ButtonFavAndBasket className={styles.favorites} item={item} typeButton="favorites" onButtonClick={onFavoriteClick}>
        <img src={isFavorite ? liked : unliked} alt={isFavorite ? liked : unliked} />
      </ButtonFavAndBasket>
      <button className={styles.loupe} onClick={toggleImageModal}>
        <img src={loupe} alt="loupe to enlarge images" />
      </button>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.price}> BYN {item.price}</p>
      <ButtonFavAndBasket className={styles.basket} item={item} typeButton="basket" onButtonClick={onBasketClick}>
        {isInBasket ? 'Remove from cart' : 'Add to cart'}
      </ButtonFavAndBasket>
      <Modal open={isImageModalOpen} onClose={toggleImageModal}>
        <ProductImageCarousel images={Array.isArray(item.images) ? item.images : [item.images]} />
      </Modal>
    </div>
  )
}
