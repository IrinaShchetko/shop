import { useEffect } from 'react'
import { RootStore } from '../../redux/store'
import { fetchCatalogThunk } from '../../redux'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux'
import { CardCategory } from '../../components/cardCategory'
import styles from './styles.module.css'

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
            <CardCategory key={product.id} item={product}></CardCategory>
          </div>
        ))}
      </div>
    </div>
  )
}
