import { Button } from '../button'
import unliked from '../../assets/main/unliked.svg'
import liked from '../../assets/main/liked.svg'
import styles from './card.module.css'
import { CardInBasketProps } from '../../shared/api/types'

export const CardInBasket = ({ item, image, onFavoriteClick, onBasketClick, isFavorite, changeValue, count }: CardInBasketProps) => {
  return (
    <>
      <div className={styles.product}>
        <img className={styles.img} src={image} alt={`photo of {item.title}`} />
        <p className={styles.title}>{item.title}</p>
        <Button className={styles.favorites} item={item} typeButton="favorites" onButtonClick={onFavoriteClick}>
          <img src={isFavorite ? liked : unliked} alt={isFavorite ? liked : unliked} />
        </Button>
        <div className={styles.quantity}>
          <button
            className={styles.quantity__decrease}
            onClick={() => {
              if (count > 1) {
                changeValue(item._id, count - 1)
              } else {
                onBasketClick()
              }
            }}
          >
            -
          </button>
          <input className={styles.quantity__input} value={count} readOnly type="number" min="1"></input>
          <button className={styles.quantity__increase} onClick={() => changeValue(item._id, count + 1)}>
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
