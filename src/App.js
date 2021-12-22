import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import io from 'socket.io-client'
import Alert from './components/Alert'
import Conversation from './components/messages/Conversation'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import {ACTION_TYPES} from './redux/actions/actionTypes'
import {refreshToken} from './redux/actions/authActions'
import {getPost} from './redux/actions/postActions'
import SocketioClient from './SocketioClient'
import PriviteRouter from './utils/PriviteRouter'

function App() {
  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()
  const login = localStorage.getItem('login')

  useEffect(() => {
    dispatch(refreshToken())
    const socket = io()
    dispatch({
      type: ACTION_TYPES.SOCKET,
      payload: socket,
    })
    return () => socket.close()
  }, [dispatch])

  useEffect(() => {
    dispatch(getPost(auth.token))
  }, [auth.token, dispatch])

  return (
    <>
      <Alert />
      {auth.token && <Navbar />}
      {auth.token && <SocketioClient />}
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
        <Route exact path='/post/:id'>
          {login ? <SinglePost /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/message/:id'>
          {login ? <Conversation /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/profile/:id'>
          {login ? <Profile /> : <Redirect to='/' />}
        </Route>
      </Switch>
    </>
  )
}

export default App
