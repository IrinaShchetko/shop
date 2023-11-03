import { CatalogProps } from '../../shared/api/types'
// import styles from './category.module.css'

interface CategoryProps {
    item: CatalogProps
}

export const CardCategory: React.FC<CategoryProps> = ({ item }) => {
    return (
        <>
            <div key={item.id}>
                <img src={item.img} alt="" />
                <p>{item.category}</p>
            </div>
        </>
    )
}
