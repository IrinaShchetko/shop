import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { CardProduct } from "../../components/cardProduct";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { RootStore } from "../../redux/store";
import { fetchGoodsThunk } from "../../redux/goods/thunk";
import styles from './products.module.css';
import { GoodsProps } from "../../shared/api/types";
import { addToFavoritesAsync, removeFromFavoritesAsync } from "../../redux";

export const Products = () => {
  const { category } = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (category) {
      dispatch(fetchGoodsThunk(category))
    }
  }, [dispatch, category])

  const { goods, error } = useAppSelector((state: RootStore) => state.goods)
  console.log(error)
  const favorites = useAppSelector((state: RootStore) => state.favorites.items)

  function handleAddFavorites(
    item: GoodsProps,
    isCurrentlyFavorited: boolean
  ) {
    const itemData = {
      _id: item._id,
      images: item.images,
      title: item.title,
      price: item.price,

      vendor_code: item.vendor_code,
      desc: item.desc,
      category: item.category,
      'fabric structure': item["fabric structure"],
      size: item.size,
      color: item.color
    }
    if (!isCurrentlyFavorited) {
      dispatch(addToFavoritesAsync(itemData))
    } else {
      dispatch(removeFromFavoritesAsync(itemData._id))
    }
  }


  return (
    <div className={styles.products}>
      {goods.map(item => {
        const isFavorite = favorites.some(favoritesItem => favoritesItem._id === item._id)

        return (
          <CardProduct
            key={item._id}
            item={item}
            onClick={() => handleAddFavorites(item, isFavorite)}
            isFavorite={isFavorite}
          />
        )
      })}
    </div>
  )
}
