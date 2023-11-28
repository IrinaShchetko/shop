import unliked from '../../assets/main/unliked.svg'
import liked from '../../assets/main/liked.svg'
import loupe from '../../assets/main/loupe.svg'
import styles from './product.module.css'
import { GoodsProps } from '../../shared/api/types'
import { Button } from '../button/index'

interface CardProductProps {
  item: GoodsProps
  onFavoriteClick: (itemId: number | string, isCurrentlyFavorite: boolean) => void
  onBasketClick: (itemId: number | string, isCurrentlyInBasket: boolean) => void
  isFavorite?: boolean
  isInBasket?: boolean
}

export const CardProduct: React.FC<CardProductProps> = ({ item, onFavoriteClick, onBasketClick, isFavorite = false, isInBasket = false }) => {
  const firstImage = Array.isArray(item.images) ? item.images[0] : item.images
  //TODO add alt
  return (
    <div className={styles.product}>
      <img className={styles.img} src={firstImage} alt={item.title} />
      <Button className={styles.favorites} item={item} typeButton="favorites" onButtonClick={onFavoriteClick}>
        <img src={isFavorite ? liked : unliked} alt={isFavorite ? liked : unliked} />
      </Button>
      <button className={styles.loupe}>
        <img src={loupe} alt="" />
      </button>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.price}> BYN {item.price}</p>
      <Button className={styles.basket} item={item} typeButton="basket" onButtonClick={onBasketClick}>
        {isInBasket ? 'Remove from cart' : 'Add to cart'}
      </Button>
    </div>
  )
}
