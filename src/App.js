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
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/'>
          {auth.token ? <Home /> : <Login />}
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <PriviteRouter exact path='/message'>
          <Messages />
        </PriviteRouter>
        <PriviteRouter exact path='/post/:id'>
          <Post />
        </PriviteRouter>
        <Route exact path='/profile/:id'>
          <Profile />
        </Route>
      </Switch>
    </>
  )
}

export default App
