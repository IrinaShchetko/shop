import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Authorization, Basket, Description, Favorites, Home, MainLayout, Products } from './pages'
import { PrivateProvider } from './shared/context/PrivateContext'

function App() {
  return (
    <>
      <BrowserRouter>
        <PrivateProvider>
          <Routes>
            <Route element={<MainLayout />}>
              {/* страница понравившиеся */}
              <Route path="/favorites" element={<Favorites />} />
              {/* страница корзины */}
              <Route path="/basket" element={<Basket />} />
              {/* страница аккаунт */}
              <Route path="/account" element={<Authorization />} />

              {/* страница хоум - каталог */}
              <Route path="/" element={<Home />} />
              {/* страница товары категории */}
              <Route path="/:category" element={<Products />} />
              <Route path="/desc/:productId" element={<Description />}></Route>
            </Route>
          </Routes>
        </PrivateProvider>
      </BrowserRouter>
    </>
  )
}

export default App
