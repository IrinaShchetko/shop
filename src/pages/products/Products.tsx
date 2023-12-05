import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CardProduct } from '../../components/cardProduct'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import { RootStore } from '../../redux/store'
import { fetchGoodsThunk } from '../../redux/goods/thunk'
import styles from './products.module.css'
import { addToBasketAsync, addToFavoritesAsync, removeFromBasketAsync, removeFromFavoritesAsync } from '../../redux'
import { useActionForButton } from '../../shared/hooks/useActionForButton'

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

  return (
    <div className="container">
      <section className={styles.products}>
        {filterData.map(item => (
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
    </div>
  )
}
