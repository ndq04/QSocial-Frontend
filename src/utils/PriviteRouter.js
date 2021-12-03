import {Route, Redirect} from 'react-router-dom'

function PriviteRouter({props, children}) {
  const login = localStorage.getItem('login')
  return login ? <Route {...props}>{children}</Route> : <Redirect to='/' />
}

export default PriviteRouter
