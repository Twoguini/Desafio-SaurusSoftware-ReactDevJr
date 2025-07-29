import {Routes, Route} from 'react-router-dom'

import Login from './pages/login'
import Orders from './pages/orders'

function Routing() {
  return(
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/orders' element={<Orders />}></Route>
    </Routes>
  )
} 

export default Routing