import { Outlet } from 'react-router-dom'
import { Header } from '../components/header'
import { useFavoritesAndBasket } from '../shared/hooks/useFavoritesAndBasket'

export const MainLayout = () => {
  const { basket } = useFavoritesAndBasket()

  const totalQuantityInBasket = basket.reduce(acc => acc + 1, 0)
  return (
    <>
      <Header totalQuantityInBasket={totalQuantityInBasket} />
      <Outlet />
    </>
  )
}
