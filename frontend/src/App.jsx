import React, { useState } from 'react'
import Navbar from './components/navbar/navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home.jsx'
import Cart from './pages/cart/cart.jsx'
import Placeorder from './pages/placeorder/placeorder.jsx'
import Footer from './components/footer/footer.jsx'
import Loginpopup from './components/loginpopup/loginpopup.jsx'
import Verify from './pages/verify/verify.jsx'
import Myorders from './pages/myorders/myorders.jsx'

const App = () => {

  const [showlogin,setshowlogin] = useState(false)

  return (
    <>
      {showlogin?<Loginpopup setshowlogin={setshowlogin}/>:<></>}
      <div className='app'>
        <Navbar setshowlogin={setshowlogin}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<Placeorder/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path="/myorders" element={<Myorders/>}/>
        </Routes>
      </div>
      <Footer />
    
    </>
   
  )
}

export default App