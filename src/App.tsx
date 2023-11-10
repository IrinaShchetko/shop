import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Favorites, Home, MainLayout, Products } from './pages'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* страница хоум - каталог */}
            <Route
              path='/'
              element={<Home />} />
            {/* страница платья */}
            <Route
              path="/:category"
              element={<Products />}
            />

            {/* страница понравившиеся */}
            <Route
              path='/favorites'
              element={<Favorites />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App