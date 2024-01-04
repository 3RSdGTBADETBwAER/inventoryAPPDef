import './App.css'
import { Routes, Route } from "react-router-dom"
import  Layout  from "./pages/Layout"
import Home from "./pages/Home"
import Default from "./pages/Default"
import CategoryItems from './pages/CategoryItems'
import Admin from './pages/Admin'
function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Layout></Layout>}>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='*' element={<Default></Default>}></Route>
              <Route path='/category/:categoryName' element={<CategoryItems></CategoryItems>}></Route>
              <Route path='/Admin' element={<Admin></Admin>}></Route>
          </Route>
      </Routes>
    </>
  )
}

export default App
