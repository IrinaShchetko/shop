import unliked from '../../../assets/main/unliked.svg'
import liked from '../../../assets/main/liked.svg'
import { DescProps } from '../../../shared/api/types'
import styles from './styles.module.css'
import { Button } from '../../buttonFavAndBasket'
import { ProductImageCarousel } from '../../productImageCarousel'

export const Desc = ({ product, onBasketClick, onFavoriteClick, isFavorite = false, isInBasket = false }: DescProps) => {
  return (
    <section className={styles.desc}>
      <div className={styles.gallery}>
        <ProductImageCarousel images={Array.isArray(product.images) ? product.images : [product.images]} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <Button className={styles.favorites} item={product} typeButton="favorites" onButtonClick={onFavoriteClick}>
          <img src={isFavorite ? liked : unliked} alt={isFavorite ? liked : unliked} />
        </Button>
        <Button className={styles.basket} item={product} typeButton="basket" onButtonClick={onBasketClick}>
          {isInBasket ? 'Remove from cart' : 'Add to cart'}
        </Button>
        {product.size.map((item, index) => (
          <div key={index} className={styles.sizesContainer}>
            <p className={styles.size}>{item}</p>
          </div>
        ))}
        <p>Rating</p>
        <div>
          <span>Product Information:</span>
          <span>Fabric composition:</span>
          <span>{product['fabric structure']}</span>
          <span>Fabric density:</span>
          <span>{product['fabric density']}</span>
          <span>{product['washing instructions']}</span>
        </div>
        <span>{product.price}</span>
        <p>{product.desc}</p>
        <span>{product.vendor_code}</span>
      </div>
    </section>
  )
}
