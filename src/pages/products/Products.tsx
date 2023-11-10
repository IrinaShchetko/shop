import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { CardProduct } from "../../components/cardProduct";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { RootStore } from "../../redux/store";
import { fetchGoodsThunk } from "../../redux/goods/thunk";
import styles from './products.module.css';

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

  const [localFavorites, setLocalFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )

  function handleAddFavorites(itemId: number, isCurrentlyFavorited: boolean) {
    const selectedItem = goods.find(item => item.id === itemId)

    if (selectedItem) {
      const itemData = {
        id: selectedItem.id,
        img: selectedItem.img,
        name: selectedItem.name,
        price: selectedItem.price,
        isFavorite: !isCurrentlyFavorited
      }

      const updatedFavorites = [...localFavorites, itemData]
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      setLocalFavorites(updatedFavorites)
    }
  }

  return (
    <div className={styles.products}>
      {goods.map(item => {
        const isFavorite = localFavorites.some(
          (favoritesItem: { id: number, name: string }) =>
            favoritesItem.id === item.id && favoritesItem.name === item.name
        );

        return (
          <CardProduct
            key={item.id}
            item={item}
            onClick={() => handleAddFavorites(item.id, isFavorite)}
            isFavorite={isFavorite}
          />
        )
      })}
    </div>
  )
}
