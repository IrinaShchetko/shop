import unliked from '../../assets/main/unliked.svg'
import liked from '../../assets/main/liked.svg'
import loupe from '../../assets/main/loupe.svg'
import styles from './product.module.css'
import { GoodsProps } from '../../shared/api/types'
import { useState } from 'react'

interface GoodProps {
    item: GoodsProps
    onClick: (itemId: number, isCurrentlyFavorite: boolean) => void
    isFavorite?: boolean
}

export const CardProduct: React.FC<GoodProps> = ({ item, onClick, isFavorite }) => {
    const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite)
    function handleFavorite() {
        setLocalIsFavorite(!localIsFavorite)
        onClick(item._id, !localIsFavorite)
    }
    const firstImage = Array.isArray(item.images) ? item.images[0] : item.images

    return (
        <div className={styles.product}>
            <img className={styles.img} src={firstImage} alt={item.title} />
            <button className={styles.favorites} onClick={handleFavorite}>
                <img src={isFavorite ? liked : unliked} alt={isFavorite ? liked : unliked} />
            </button>
            <button className={styles.loupe}>
                <img src={loupe} alt="" />
            </button>
            <p className={styles.title}>{item.title}</p>
            {/* <p className={styles.rating}></p> */}
            <p className={styles.price}> BYN {item.price}</p>
            <button className={styles.basket}>Add to cart</button>
        </div>
    )
}

