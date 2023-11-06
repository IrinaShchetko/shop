import { CatalogProps } from '../../shared/api/types'
import styles from './category.module.css'

interface CategoryProps {
    item: CatalogProps
}

export const CardCategory: React.FC<CategoryProps> = ({ item }) => {
    return (
        <>
            <div className={styles.category} key={item.id}>
                <img className={styles.img} src={item.img} alt="" />
                <p className={styles.desc}>{item.category}</p>
            </div>
        </>
    )
}
