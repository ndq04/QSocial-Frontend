import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import Alert from './components/Alert'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import {refreshToken} from './redux/actions/authActions'
import {getPost} from './redux/actions/postActions'
import PriviteRouter from './utils/PriviteRouter'

function App() {
  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPost(auth.token))
  }, [auth.token, dispatch])

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
        <Route exact path='/post/:id'>
          <SinglePost />
        </Route>
        <Route exact path='/profile/:id'>
          <Profile />
        </Route>
      </Switch>
    </>
  )
}

export default App
