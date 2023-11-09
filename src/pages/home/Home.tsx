import { useEffect } from 'react'
import { RootStore } from '../../context/store'
import { fetchCatalogThunk } from '../../context'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import { CardCategory } from '../../components/cardCategory'
import styles from './home.module.css'

export const Home = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
      dispatch(fetchCatalogThunk())
    }, [dispatch])
    const { catalog, error } = useAppSelector((state: RootStore) => state.catalog)
    console.log(error)
  
    return (
        <div className={styles.categories}>
        {catalog.map((product) => (
          <CardCategory key={product.id} item={product}></CardCategory>
        ))}
      </div>
      )
}
 
