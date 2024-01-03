import './App.css'
import { Routes, Route } from "react-router-dom"
import  Layout  from "./pages/layout"
import Home from "./pages/home"
import Default from "./pages/Default"
import CategoryItems from './pages/CategoryItems'
function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Layout></Layout>}>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='*' element={<Default></Default>}></Route>
              <Route path='/category/:categoryName' element={<CategoryItems></CategoryItems>}></Route>
          </Route>
      </Routes>
    </>
  )
}

export default App
