import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, MainLayout } from './pages'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App