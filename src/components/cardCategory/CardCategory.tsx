import { Link } from 'react-router-dom'
import { CatalogProps } from '../../shared/api/types'
import styles from './category.module.css'

interface CategoryProps {
  item: CatalogProps
}
//TODO: add description
export const CardCategory: React.FC<CategoryProps> = ({ item }) => {
  return (
    <>
      <Link className={styles.category} key={item.id} to={`${item.category}`}>
        <img className={styles.img} src={item.img} alt="" />
        <h2 className={styles.desc}>{item.category}</h2>
      </Link>
    </>
  )
}
