import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import io from 'socket.io-client'
import Alert from './components/Alert'
import Conversation from './components/messages/Conversation'
import ConversationAll from './components/messages/ConversationAll'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Messages from './pages/Messages'
import Notification from './pages/Notification'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import {ACTION_TYPES} from './redux/actions/actionTypes'
import {refreshToken} from './redux/actions/authActions'
import {getNotify} from './redux/actions/notifyActions'
import {getPost} from './redux/actions/postActions'
import SocketioClient from './SocketioClient'

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
    if (auth.token) {
      dispatch(getPost(auth.token))
      dispatch(getNotify(auth.token))
    }
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
        <Route exact path='/message'>
          {login ? <Messages /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/post/:id'>
          {login ? <SinglePost /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/notify'>
          {login ? <Notification /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/messageall/:id'>
          {login ? <ConversationAll /> : <Redirect to='/' />}
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
