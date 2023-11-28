import styles from './backet.module.css'
import { useFavoritesAndBasket } from '../../shared/hooks/useFavoritesAndBasket'
import { BasketSum } from '../../components/basketSum'
import { CardInBasket } from '../../components/cardInBasket'
import { addToBasketAsync, addToFavoritesAsync, removeFromBasketAsync, removeFromFavoritesAsync } from '../../redux'
import { useState } from 'react'
//TODO: add function PayClick
export const Basket = () => {
  const { favorites, basket, handleActionForFavorites, handleActionForBasket } = useFavoritesAndBasket()
  const [quantity, setQuantity] = useState(1)

  const handleQuantityPlus = () => {
    setQuantity(quantity + 1)
  }
  const handleQuantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const totalSum = basket.reduce((acc, item) => acc + item.price * quantity, 0)
  const handlePayClick = () => {
    console.log('Payment successful!')
  }

  return (
    <div className={styles.basket}>
      <div className={styles.goods}>
        {basket.map(item => {
          const firstImage = Array.isArray(item.images) ? item.images[0] : item.images
          return (
            <CardInBasket
              item={item}
              image={firstImage}
              onQuantityChangePlus={handleQuantityPlus}
              onQuantityChangeMinus={handleQuantityMinus}
              quantity={quantity}
              onFavoriteClick={() =>
                handleActionForFavorites(
                  item,
                  favorites.some(favoritesItem => favoritesItem._id === item._id),
                  addToFavoritesAsync,
                  removeFromFavoritesAsync,
                )
              }
              isFavorite={favorites.some(favoritesItem => favoritesItem._id === item._id)}
              onBasketClick={() =>
                handleActionForBasket(
                  item,
                  basket.some(basketItem => basketItem._id === item._id),
                  addToBasketAsync,
                  removeFromBasketAsync,
                )
              }
            />
          )
        })}
      </div>
      <BasketSum total={totalSum} onButtonClick={handlePayClick} />
    </div>
  )
}
