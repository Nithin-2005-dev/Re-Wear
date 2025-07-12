import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from '../Page/Home'
import Products from '../Page/Products'
import Requests from '../Page/Requests'
import Login from '../Page/Login'
import Register from '../Page/Register'
import Product from '../Page/Product'
const App = () => {
  return <Router>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/products' element={<Products/>}/>
  <Route path='/products/:id' element={<Product/>}/>
  <Route path='/requests' element={<Requests/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
</Routes>
  </Router>
}

export default App
