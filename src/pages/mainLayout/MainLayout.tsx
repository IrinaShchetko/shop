import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'
import { useFavoritesAndBasket } from '../../shared/hooks/useFavoritesAndBasket'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import { useSearch } from '../../shared/hooks/useSearch'
import { useEffect, useState } from 'react'
import { addToBasketAsync, addToFavoritesAsync, fetchGoodsThunk, removeFromBasketAsync, removeFromFavoritesAsync } from '../../redux'
import { RootStore } from '../../redux/store'
import { useActionForButton } from '../../shared/hooks/useActionForButton'
import { CardProduct } from '../../components/cardProduct'
import styles from './main.module.css'
import { AppPagination } from '../../components/pagination'
import { usePrivate } from '../../shared/context/PrivateContext'

export const MainLayout = () => {
  const { basket, favorites } = useFavoritesAndBasket()
  const dispatch = useAppDispatch()
  const { goods } = useAppSelector((state: RootStore) => state.goods)

  const { searchValue, filteredData } = useSearch()
  useEffect(() => {
    dispatch(fetchGoodsThunk('all'))
  }, [dispatch])
  const searchData = filteredData(goods)
  const handleActionForButton = useActionForButton()
  const pageSize = 6
  const [currentPage, setCurrentPage] = useState(1)
  const totalCount = searchData.length
  const isDataAvailable = totalCount > 0 && searchData.length > 0

  const currentPageData = searchData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const { basketCount, privateVisibility, updateBasketCount } = usePrivate()
  useEffect(() => {
    updateBasketCount()
  }, [])

  return (
    <div className="container">
      {privateVisibility ? <Header totalQuantityInBasket={basketCount} /> : <Header totalQuantityInBasket={0} />}
      {searchValue ? (
        <>
          <div className={styles.products}>
            {currentPageData.map(item => (
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
            ))}
          </div>
          {isDataAvailable ? (
            <AppPagination count={searchData.length} page={pageSize} currentPage={currentPage} setPage={setCurrentPage} />
          ) : (
            <p>No products found based on your search</p>
          )}
        </>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
