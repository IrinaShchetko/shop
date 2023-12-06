import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardProduct } from '../../components/cardProduct'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import { RootStore } from '../../redux/store'
import { fetchGoodsThunk } from '../../redux/goods/thunk'
import styles from './products.module.css'
import { addToBasketAsync, addToFavoritesAsync, removeFromBasketAsync, removeFromFavoritesAsync } from '../../redux'
import { useActionForButton } from '../../shared/hooks/useActionForButton'
import { AppPagination } from '../../components/pagination'

export const Products = () => {
  const { category } = useParams()
  const dispatch = useAppDispatch()
  const handleActionForButton = useActionForButton()
  const { goods } = useAppSelector((state: RootStore) => state.goods)
  const favorites = useAppSelector((state: RootStore) => state.favorites.items)
  const basket = useAppSelector((state: RootStore) => state.basket.items)

  useEffect(() => {
    dispatch(fetchGoodsThunk('all'))
  }, [dispatch, category])

  const filterData = goods.filter(item => item.category === category) //фильтр товаров по категории
  const pageSize = 6 //кол-во товаров на странице
  const [currentPage, setCurrentPage] = useState(1)
  const totalCount = filterData.length
  const isDataAvailable = totalCount > 0 && filterData.length > 0

  const currentPageData = filterData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="container">
      <section className={styles.products}>
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
      </section>
      {isDataAvailable ? (
        <AppPagination count={filterData.length} page={pageSize} currentPage={currentPage} setPage={setCurrentPage} />
      ) : (
        <p>No products found in this category</p>
      )}
    </div>
  )
}
