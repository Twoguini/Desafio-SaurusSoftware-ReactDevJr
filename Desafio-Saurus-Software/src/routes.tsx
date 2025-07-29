import {Routes, Route} from 'react-router-dom'

import Login from './pages/login'

function Routing() {
  return(
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/orders'></Route>
    </Routes>
  )
} 

export default Routing