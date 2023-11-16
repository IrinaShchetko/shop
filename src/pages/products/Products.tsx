import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { CardProduct } from "../../components/cardProduct";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { RootStore } from "../../redux/store";
import { fetchGoodsThunk } from "../../redux/goods/thunk";
import styles from './products.module.css';
import { addToBasketAsync, addToFavoritesAsync, removeFromBasketAsync, removeFromFavoritesAsync } from "../../redux";
import { useActionForButton } from "../../shared/hooks/useActionForButton";

export const Products = () => {
  const { category } = useParams()
  const dispatch = useAppDispatch()
  const handleActionForButton = useActionForButton()
  useEffect(() => {
    if (category) {
      dispatch(fetchGoodsThunk(category))
    }
  }, [dispatch, category])

  const { goods } = useAppSelector((state: RootStore) => state.goods)
  const favorites = useAppSelector((state: RootStore) => state.favorites.items)
  const basket = useAppSelector((state: RootStore) => state.basket.items)

  return (
    <div className={styles.products}>
      {goods.map(item => {
        const isFavorite = favorites.some(favoritesItem => favoritesItem._id === item._id)
        const isInBasket = basket.some(basketItem => basketItem._id === item._id)

        return (
          <CardProduct
            key={item._id}
            item={item}
            onFavoriteClick={() => handleActionForButton(item, isFavorite, addToFavoritesAsync, removeFromFavoritesAsync)}
            isFavorite={isFavorite}
            onBasketClick={() => handleActionForButton(item, isInBasket, addToBasketAsync, removeFromBasketAsync)}
            isInBasket={isInBasket}
          />
        )
      })}
    </div>
  )
}
