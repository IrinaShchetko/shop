import { useEffect } from 'react'
import { useActionForButton } from './useActionForButton'
import { useAppDispatch, useAppSelector } from './useRedux'
import { fetchBasketThunk, fetchFavoritesThunk } from '../../redux'
import { RootStore } from '../../redux/store'

export const useFavoritesAndBasket = () => {
  const dispatch = useAppDispatch()
  const handleActionForFavorites = useActionForButton()
  useEffect(() => {
    dispatch(fetchFavoritesThunk())
  }, [dispatch])
  const handleActionForBasket = useActionForButton()
  useEffect(() => {
    dispatch(fetchBasketThunk())
  }, [dispatch])
  const favorites = useAppSelector((state: RootStore) => state.favorites.items)
  const basket = useAppSelector((state: RootStore) => state.basket.items)
  return {
    handleActionForFavorites,
    handleActionForBasket,
    favorites,
    basket,
  }
}
