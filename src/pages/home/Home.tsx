import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RootStore } from '../../redux/store'
import { fetchCatalogThunk, fetchGoodsThunk } from '../../redux'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import { CardCategory } from '../../components/cardCategory'
import styles from './home.module.css'
import { CardProduct } from '../../components/cardProduct'
import { addToBasketAsync, addToFavoritesAsync, removeFromBasketAsync, removeFromFavoritesAsync } from '../../redux'
import { useActionForButton } from '../../shared/hooks/useActionForButton'
import { useSearch } from '../../shared/hooks/useSearch'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { searchValue } = useSearch()
  useEffect(() => {
    dispatch(fetchCatalogThunk())
    dispatch(fetchGoodsThunk('all')) //для поиска по товарам
  }, [dispatch])
  const { catalog } = useAppSelector((state: RootStore) => state.catalog)
  const { goods } = useAppSelector((state: RootStore) => state.goods)

  const filteredData = goods.filter(
    item =>
      item.category.toLowerCase().includes(searchValue) || //по категории
      item.title.toLowerCase().includes(searchValue), //по названию
  ) // поиск

  const favorites = useAppSelector((state: RootStore) => state.favorites.items)
  const basket = useAppSelector((state: RootStore) => state.basket.items)
  const handleActionForButton = useActionForButton() //кнопка избранное и в корзину однотипны

  return (
    <>
      <div className={styles.wrapper}>
        {searchValue
          ? filteredData.map(item => (
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
          : catalog.map(product => (
              <div className={styles.category}>
                <Link className={styles.category} key={product.id} to={`${product.category}`}>
                  <CardCategory key={product.id} item={product}></CardCategory>
                </Link>
              </div>
            ))}
      </div>
    </>
  )
}
