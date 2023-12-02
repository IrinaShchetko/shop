import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  const { catalog } = useAppSelector((state: RootStore) => state.catalog)

  return (
    <div className="container">
      <div className={styles.wrapper}>
        {catalog.map(product => (
          <div className={styles.category}>
            <Link className={styles.category} key={product.id} to={`${product.category}`}>
              <CardCategory key={product.id} item={product}></CardCategory>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
