import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'
import { useFavoritesAndBasket } from '../../shared/hooks/useFavoritesAndBasket'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import { useSearch } from '../../shared/hooks/useSearch'
import { useEffect } from 'react'
import { addToBasketAsync, addToFavoritesAsync, fetchGoodsThunk, removeFromBasketAsync, removeFromFavoritesAsync } from '../../redux'
import { RootStore } from '../../redux/store'
import { useActionForButton } from '../../shared/hooks/useActionForButton'
import { CardProduct } from '../../components/cardProduct'
import styles from './main.module.css'

export const MainLayout = () => {
  const { basket, favorites } = useFavoritesAndBasket()
  const dispatch = useAppDispatch()
  const { goods } = useAppSelector((state: RootStore) => state.goods)

  const { searchValue, filteredData } = useSearch()
  useEffect(() => {
    dispatch(fetchGoodsThunk('all'))
  }, [dispatch])
  const searchData = filteredData(goods) // фильтр товаров согласно поиску
  const handleActionForButton = useActionForButton()
  const totalQuantityInBasket = basket.reduce(acc => acc + 1, 0)
  return (
    <>
      <Header totalQuantityInBasket={totalQuantityInBasket} />
      <div className={styles.products}>
        {searchValue ? (
          searchData.map(item => (
            <CardProduct
              key={item._id}
              item={item}
              onFavoriteClick={() =>
                handleActionForButton(
                  item,
                  favorites.some(favoritesItem => favoritesItem._id === item._id),
                  addToFavoritesAsync,
                  removeFromFavoritesAsync,
                )
              }
              isFavorite={favorites.some(favoritesItem => favoritesItem._id === item._id)}
              onBasketClick={() =>
                handleActionForButton(
                  item,
                  basket.some(basketItem => basketItem._id === item._id),
                  addToBasketAsync,
                  removeFromBasketAsync,
                )
              }
              isInBasket={basket.some(basketItem => basketItem._id === item._id)}
            />
          ))
        ) : (
          <Outlet />
        )}
      </div>
    </>
  )
}
