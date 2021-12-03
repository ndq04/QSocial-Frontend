import {useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Messages from './pages/Messages'

import {refreshToken} from './redux/actions/authActions'
import Alert from './components/Alert'
import Navbar from './components/Navbar'
import PriviteRouter from './utils/PriviteRouter'

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
      <Switch>
        <Route path='/register'>
          <Register />
        </Route>
        <Route exact path='/'>
          {auth.token ? <Home /> : <Login />}
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <PriviteRouter path='/message'>
          <Messages />
        </PriviteRouter>
        <PriviteRouter path='/post/:id'>
          <Post />
        </PriviteRouter>
        <PriviteRouter path='/profile/:id'>
          <Profile />
        </PriviteRouter>
      </Switch>
    </>
  )
}

export default App
