import styles from './backet.module.css'
import { useFavoritesAndBasket } from '../../shared/hooks/useFavoritesAndBasket'
import { BasketSum } from '../../components/basketSum'
import { CardInBasket } from '../../components/cardInBasket'
import { addToBasketAsync, addToFavoritesAsync, removeFromBasketAsync, removeFromFavoritesAsync } from '../../redux'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../shared/hooks/useRedux'
import { basketSlice } from '../../redux/basket/slice'
//TODO: add function PayClick
export const Basket = () => {
  const { favorites, basket, handleActionForFavorites, handleActionForBasket } = useFavoritesAndBasket()

  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState<Record<string, number>>({})
  const handleQuantityChange = (itemId: string, increment: boolean) => {
    dispatch(basketSlice.actions.updateQuantity({ itemId, increment }))
    setQuantity(prevQuantities => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 0) + (increment ? 1 : -1), 1),
    }))
  }

  const [totalSum, setTotalSum] = useState(0)
  useEffect(() => {
    const updatedTotalSum = basket.reduce((acc, item) => acc + item.price * (quantity[item._id] || 1), 0)
    setTotalSum(updatedTotalSum)
  }, [quantity, basket])
  const handlePayClick = () => {
    console.log('Payment successful!')
  }
  return (
    <div className="container">
      <section className={styles.basket}>
        <div className={styles.goods}>
          {basket.map(item => {
            const firstImage = Array.isArray(item.images) ? item.images[0] : item.images
            return (
              <CardInBasket
                item={item}
                image={firstImage}
                onQuantityChangePlus={() => handleQuantityChange(item._id, true)}
                onQuantityChangeMinus={() => handleQuantityChange(item._id, false)}
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
      </section>
    </div>
  )
}
