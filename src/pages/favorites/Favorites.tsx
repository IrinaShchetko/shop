import styles from './favorites.module.css'
import { CardProduct } from '../../components/cardProduct'
import { addToBasketAsync, addToFavoritesAsync, removeFromBasketAsync, removeFromFavoritesAsync } from '../../redux'
import { useFavoritesAndBasket } from '../../shared/hooks/useFavoritesAndBasket'

export const Favorites = () => {
  const { favorites, basket, handleActionForFavorites, handleActionForBasket } = useFavoritesAndBasket()

  return (
    <div className="container">
      <section className={styles.favorites}>
        {favorites.map(item => {
          const isFavorite = favorites.some(favoritesItem => favoritesItem._id === item._id)
          const isInBasket = basket.some(basketItem => basketItem._id === item._id)
          return (
            <CardProduct
              key={item._id}
              item={item}
              onFavoriteClick={() => handleActionForFavorites(item, isFavorite, addToFavoritesAsync, removeFromFavoritesAsync)}
              isFavorite={isFavorite}
              onBasketClick={() => handleActionForBasket(item, isInBasket, addToBasketAsync, removeFromBasketAsync)}
              isInBasket={isInBasket}
            />
          )
        })}
      </section>
    </div>
  )
}
