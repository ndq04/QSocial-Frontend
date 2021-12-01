import Home from './pages/home'
import Profile from './pages/profile'
import Login from './pages/Login'
import Register from './pages/Register'
import {Routes, Route} from 'react-router-dom'
import Post from './pages/Post'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
