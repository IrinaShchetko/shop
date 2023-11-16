import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Authorization, Basket, Favorites, Home, MainLayout, Products } from './pages'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>

            {/* страница понравившиеся */}
            <Route
              path='/favorites'
              element={<Favorites />} />
            {/* страница корзины */}
            <Route
              path='/basket'
              element={<Basket />} />
            {/* страница аккаунт */}
            <Route
              path='/account'
              element={<Authorization />} />

            {/* страница хоум - каталог */}
            <Route
              path='/'
              element={<Home />} />
            {/* страница платья */}
            <Route
              path="/:category"
              element={<Products />}
            />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App