import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { RootStore } from '../../redux/store'
import { fetchCatalogThunk } from '../../redux'
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
          <Link className={styles.category} key={product.id} to={`${product.category}`}>
          <CardCategory key={product.id} item={product}></CardCategory>
          </Link>
        ))}
      </div>
      )
}
 
