import styles from './favorites.module.css'
import { useEffect } from "react";
import { CardProduct } from "../../components/cardProduct";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux";
import { RootStore } from "../../redux/store";
import { GoodsProps } from "../../shared/api/types";
import { addToFavoritesAsync, fetchFavoritesThunk, removeFromFavoritesAsync } from "../../redux";

export const Favorites = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchFavoritesThunk())
    }, [dispatch])

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
            dispatch(removeFromFavoritesAsync(itemData))
        }
    }


    return (
        <div className={styles.products}>
            {favorites.map(item => {
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
