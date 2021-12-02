import {useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Post from './pages/Post'
import Alert from './components/Alert'

import {refreshToken} from './redux/actions/authActions'
import Navbar from './components/Navbar'

function App() {
  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])
  return (
    <>
      <Alert />
      {auth.token && <Navbar />}
      <Routes>
        <Route path='/' element={auth.token ? <Home /> : <Login />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
