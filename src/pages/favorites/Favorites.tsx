import styles from './favorites.module.css'
import { useEffect } from 'react'
import { CardProduct } from '../../components/cardProduct'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import { RootStore } from '../../redux/store'
import {
  addToBasketAsync,
  addToFavoritesAsync,
  fetchFavoritesThunk,
  removeFromBasketAsync,
  removeFromFavoritesAsync,
} from '../../redux'
import { useActionForButton } from '../../shared/hooks/useActionForButton'

export const Favorites = () => {
  const dispatch = useAppDispatch()
  const handleActionForButton = useActionForButton()
  useEffect(() => {
    dispatch(fetchFavoritesThunk())
  }, [dispatch])

  const favorites = useAppSelector((state: RootStore) => state.favorites.items)
  const basket = useAppSelector((state: RootStore) => state.basket.items)

  return (
    <div className={styles.favorites}>
      {favorites.map(item => {
        const isFavorite = favorites.some(
          favoritesItem => favoritesItem._id === item._id,
        )
        const isInBasket = basket.some(
          basketItem => basketItem._id === item._id,
        )
        return (
          <CardProduct
            key={item._id}
            item={item}
            onFavoriteClick={() =>
              handleActionForButton(
                item,
                isFavorite,
                addToFavoritesAsync,
                removeFromFavoritesAsync,
              )
            }
            isFavorite={isFavorite}
            onBasketClick={() =>
              handleActionForButton(
                item,
                isInBasket,
                addToBasketAsync,
                removeFromBasketAsync,
              )
            }
            isInBasket={isInBasket}
          />
        )
      })}
    </div>
  )
}
