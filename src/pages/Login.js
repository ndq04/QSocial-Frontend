import {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {login} from '../redux/actions/authActions'
import {useDispatch, useSelector} from 'react-redux'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const {email, password} = state
  const {auth, alert} = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (auth.token) {
      history.push('/')
    }
  }, [auth.token, history])

  const handleChange = (e) => {
    const {name, value} = e.target
    setState({...state, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(state))
  }
  return (
    <div className='login bg-[#f0f2f5] select-none h-screen flex items-center'>
      <div className='login-content m-auto flex items-center'>
        <div className='login-left flex flex-col bg-white rounded-lg shadow-md px-4 py-10 w-[40%] mr-10'>
          <form
            className='flex flex-col border-b border-gray-300 pb-5 mb-5'
            onSubmit={handleSubmit}
          >
            <div className='form-control mb-4'>
              <input
                type='email'
                required
                placeholder='Email'
                className={`border-2 rounded-md w-full focus:border-blue-500 
                outline-none py-3 px-3 text-lg ${
                  alert.error && 'border-red-400'
                }`}
                value={email}
                name='email'
                onChange={handleChange}
              />
            </div>
            <div className='form-control relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder='Mật khẩu'
                className={`border-2 rounded-md w-full focus:border-blue-500 
                outline-none py-3 px-3 text-lg ${
                  alert.error && 'border-red-400'
                }`}
                value={password}
                name='password'
                onChange={handleChange}
              />
              {password.length > 0 && (
                <p
                  className='absolute right-2 top-1/2 border
                  -translate-y-1/2 cursor-pointer py-1 px-3 rounded-md 
                hover:bg-gray-200 hover:text-blue-600 transition-colors duration-200'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 
              text-white text-lg font-semibold py-2.5 rounded-lg mt-10'
            >
              Đăng nhập
            </button>
          </form>
          <Link
            to='/register'
            className='bg-[#00a400] hover:bg-[#048004]
              text-white font-semibold py-2 rounded-lg text-center w-[50%] mx-auto'
          >
            <p>Tạo tài khoản mới</p>
          </Link>
        </div>
        <div className='login-right w-[50%]'>
          <p className='font-bold text-6xl text-blue-500'>Q Social</p>
          <p className='text-2xl font-medium mt-5'>
            Q Social giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
