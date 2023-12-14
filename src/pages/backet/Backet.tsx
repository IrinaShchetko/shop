import { useEffect, useState } from 'react'
import styles from './backet.module.css'
import { useFavoritesAndBasket } from '../../shared/hooks/useFavoritesAndBasket'
import { BasketSum } from '../../components/basketSum'
import { CardInBasket } from '../../components/cardInBasket'
import { addToBasketAsync, removeFromBasketAsync, updateQuantityAsync, addToFavoritesAsync, removeFromFavoritesAsync } from '../../redux'
import { useAppDispatch } from '../../shared/hooks/useRedux'
import { BackButton } from '../../components/backButton'
import { usePrivate } from '../../shared/context/PrivateContext'

// // TODO: добавить функцию PayClick
// //TODO: доделать token
export const Basket = () => {
  const { favorites, basket, handleActionForFavorites, handleActionForBasket } = useFavoritesAndBasket()
  const dispatch = useAppDispatch()
  const [totalSum, setTotalSum] = useState(0)
  const { privateVisibility, updateBasketCount } = usePrivate()

  useEffect(() => {
    updateBasketCount()
  }, [])

  useEffect(() => {
    const updatedTotalSum = basket.reduce((acc, item) => acc + item.price * item.count, 0)
    setTotalSum(updatedTotalSum)
  }, [basket])

  const handleQuantityChange = async (itemId: string, value: number) => {
    try {
      await dispatch(updateQuantityAsync({ itemId, count: value }))
    } catch (error) {
      console.error('Ошибка при обновлении количества товара в корзине', error)
    }
  }

  const handlePayClick = () => {
    console.log('Оплата успешно проведена!')
  }

  return (
    <div className="container">
      <>
        <BackButton />
        {privateVisibility ? (
          <section className={styles.basket}>
            <div className={styles.goods}>
              {basket.map(item => (
                <CardInBasket
                  key={item._id}
                  item={item}
                  image={Array.isArray(item.images) ? item.images[0] : item.images}
                  count={item.count}
                  changeValue={(itemId, value) => handleQuantityChange(itemId, value)}
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
              ))}
            </div>
            <BasketSum total={totalSum} onButtonClick={handlePayClick} />
          </section>
        ) : (
          <p>Please log in or register to view your basket.</p>
        )}
      </>
    </div>
  )
}
