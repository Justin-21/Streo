import './app.scss'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Watch from './pages/watch/Watch'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useContext } from 'react'
// import { AuthContext } from './authContext/AuthContext'

const App = () => {
  // const { user } = useContext(AuthContext)
  const user = true
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        {/* <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        /> */}
        <Route path='/movies' element={<Home type='movie' />} />
        <Route path='/series' element={<Home type='series' />} />
        <Route path='/watch' element={<Watch />} />
        {/* {user && (
          <>
            
          </>
        )} */}
      </Routes>
    </Router>
  )
}

export default App
