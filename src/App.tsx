import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, MainLayout, Products } from './pages'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
{/* страница хоум - каталог */}
            <Route 
            path='/' 
            element={<Home />}/>
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