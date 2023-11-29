import { Button } from '../button'
import unliked from '../../assets/main/unliked.svg'
import liked from '../../assets/main/liked.svg'
import styles from './card.module.css'
import { GoodsProps } from '../../shared/api/types'

interface CardInBasketProps {
  item: GoodsProps
  image: string
  onFavoriteClick: (itemId: number | string, isCurrentlyFavorite: boolean) => void
  onBasketClick: (itemId: number | string, isCurrentlyInBasket: boolean) => void
  isFavorite?: boolean
  isInBasket?: boolean
  onQuantityChangeMinus: () => void
  onQuantityChangePlus: () => void
  quantity: Record<string, number>
}
export const CardInBasket = ({
  item,
  image,
  onFavoriteClick,
  onBasketClick,
  isFavorite,
  onQuantityChangeMinus,
  onQuantityChangePlus,
  quantity,
}: CardInBasketProps) => {
  return (
    <>
      <div className={styles.product}>
        <img className={styles.img} src={image} alt={`photo of {item.title}`} />
        <p className={styles.title}>{item.title}</p>
        <Button className={styles.favorites} item={item} typeButton="favorites" onButtonClick={onFavoriteClick}>
          <img src={isFavorite ? liked : unliked} alt={isFavorite ? liked : unliked} />
        </Button>
        <div className={styles.quantity}>
          <button className={styles.quantity__decrease} onClick={onQuantityChangeMinus}>
            -
          </button>
          <span className={styles.quantity__input}>{quantity[item._id]}</span>
          <button className={styles.quantity__increase} onClick={onQuantityChangePlus}>
            +
          </button>
        </div>
        <Button className={styles.remove__basket} item={item} typeButton="basket" onButtonClick={onBasketClick}>
          Remove
        </Button>
      </div>
    </>
  )
}
