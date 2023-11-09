import favorites from '../../assets/main/unliked.svg'
import loupe from '../../assets/main/loupe.svg'
import styles from './product.module.css'
import { GoodsProps } from '../../shared/api/types'

interface GoodProps {
    item: GoodsProps
}

export const CardProduct: React.FC<GoodProps> = ({item}) => {
    return (  
        <div className={styles.product}>
        <img className={styles.img} src={item.img} alt="" />
        <button className={styles.favorites}>
            <img src={favorites} alt="" />
        </button>
<button className={styles.loupe}>
    <img src={loupe} alt="" />
</button>
        <p className={styles.title}>{item.name}</p>
        <p className={styles.rating}></p>
        <p className={styles.price}> BYN {item.price}</p>
        <button className={styles.basket}>Add to cart</button>
        </div>
    )
}
 
