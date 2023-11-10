import { useState, useEffect } from 'react'
import { CardProduct } from "../../components/cardProduct"
import { GoodsProps } from "../../shared/api/types"
import styles from './favorites.module.css'

export const Favorites = () => {
    const [favoriteItems, setFavoriteItems] = useState<GoodsProps[]>([])

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites')
        const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : []
        setFavoriteItems(parsedFavorites)
    }, [])

    function handleDeleteFavorites(productId: number) {
        const updatedFavorites = favoriteItems.filter((item) => item.id !== productId)
        setFavoriteItems(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

    return (
        <div className={styles.favorites}>
            {favoriteItems.map((product: GoodsProps) => (
                <CardProduct key={product.id} item={product} onClick={() => handleDeleteFavorites(product.id)} isFavorite={true} />
            ))}
        </div>
    );
}
