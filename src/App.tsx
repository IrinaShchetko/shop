import { Header } from './components/header'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './shared/hooks/useRedux';
import { fetchCatalogThunk } from './context';
import { RootStore } from './context/store';
import { CardCategory } from './components/cardCategoryProduct';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCatalogThunk())
  }, [dispatch])
  const { catalog, error } = useAppSelector((state: RootStore) => state.catalog)
  console.log(error)

  return (
    <>
      <Header />
      <div>
        <div>
          {catalog.map((product) => (
            <CardCategory item={product}></CardCategory>
          ))}
        </div>
      </div>
    </>
  )
}

export default App