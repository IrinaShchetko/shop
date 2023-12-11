import { useParams } from 'react-router-dom'
import { Desc } from '../../components/cardDetail/desc'
import { RootStore } from '../../redux/store'
import { useAppSelector } from '../../shared/hooks/useRedux'
import { addToBasketAsync, addToFavoritesAsync, removeFromBasketAsync, removeFromFavoritesAsync } from '../../redux'
import { useActionForButton } from '../../shared/hooks/useActionForButton'
import { BackButton } from '../../components/backButton'

export const Description = () => {
  const { goods } = useAppSelector((state: RootStore) => state.goods)
  const { productId } = useParams<{ productId: string }>()
  const selectedProduct = goods.find(product => product._id === productId)
  if (!selectedProduct) {
    return <p>Product not found</p>
  }

  const favorites = useAppSelector((state: RootStore) => state.favorites.items)
  const basket = useAppSelector((state: RootStore) => state.basket.items)
  const handleActionForButton = useActionForButton()

  return (
    <div className="container">
      <BackButton />
      <Desc
        key={selectedProduct._id}
        product={selectedProduct}
        onFavoriteClick={() =>
          handleActionForButton(
            selectedProduct,
            favorites.some(favoritesItem => favoritesItem._id === selectedProduct._id),
            addToFavoritesAsync,
            removeFromFavoritesAsync,
          )
        }
        isFavorite={favorites.some(favoritesItem => favoritesItem._id === selectedProduct._id)}
        onBasketClick={() =>
          handleActionForButton(
            selectedProduct,
            basket.some(basketItem => basketItem._id === selectedProduct._id),
            addToBasketAsync,
            removeFromBasketAsync,
          )
        }
        isInBasket={basket.some(basketItem => basketItem._id === selectedProduct._id)}
      />
    </div>
  )
}
