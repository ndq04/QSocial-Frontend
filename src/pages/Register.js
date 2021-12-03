import {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {register} from '../redux/actions/authActions'
import {useSelector, useDispatch} from 'react-redux'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showCfPassword, setShowCfPassword] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()
  const {auth, alert} = useSelector((state) => state)

  const [state, setState] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    cfPassword: '',
    gender: 'male',
  })
  const {fullname, username, email, password, cfPassword, gender} = state

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

    dispatch(register(state))
  }

  return (
    <div className='register bg-[#f0f2f5] select-none h-screen flex items-center'>
      <div className='register-content m-auto flex items-center max-w-5xl'>
        <div className='register-left w-[45%] mx-auto'>
          <p className='font-bold text-6xl text-blue-500'>Q Social</p>
          <p className='text-2xl font-medium mt-5'>
            Q Social giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </p>
        </div>
        <div className='register-right w-[45%] mx-auto flex flex-col bg-white rounded-lg shadow-md px-4 py-8'>
          <form
            className='flex flex-col border-b border-gray-300 pb-3 mb-5'
            onSubmit={handleSubmit}
          >
            <div className='form-control mb-6 relative'>
              <input
                type='text'
                placeholder='Họ và tên'
                className={`border-2 rounded-md w-full focus:border-blue-500 
                outline-none p-3 text-lg ${
                  alert.fullname && 'border-red-400'
                } ${alert.fullname && 'focus:border-red-400'}`}
                value={fullname}
                name='fullname'
                onChange={handleChange}
              />
              {alert.fullname && (
                <small className='text-red-500 absolute left-0 top-[100%]'>
                  {alert.fullname}
                </small>
              )}
            </div>
            <div className='form-control mb-6 relative'>
              <input
                type='text'
                placeholder='Tên đăng nhập'
                className={`border-2 rounded-md w-full focus:border-blue-500 
                outline-none p-3 text-lg ${
                  alert.username && 'border-red-400'
                }  ${alert.username && 'focus:border-red-400'}`}
                value={username.toLowerCase().trim(/ /g, '')}
                name='username'
                onChange={handleChange}
              />
              {alert.username && (
                <small className='text-red-500 absolute left-0 top-[100%]'>
                  {alert.username}
                </small>
              )}
            </div>
            <div className='form-control mb-6 relative'>
              <input
                type='text'
                placeholder='Email'
                className={`border-2 rounded-md w-full focus:border-blue-500 
                outline-none p-3 text-lg ${alert.email && 'border-red-400'} ${
                  alert.email && 'focus:border-red-400'
                }`}
                value={email.trim(/ /g, '')}
                name='email'
                onChange={handleChange}
              />
              {alert.email && (
                <small className='text-red-500 absolute left-0 top-[100%]'>
                  {alert.email}
                </small>
              )}
            </div>
            <div className='form-control mb-6 relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Mật khẩu'
                className={`border-2 rounded-md w-full focus:border-blue-500 
                outline-none p-3 text-lg ${
                  alert.password && 'border-red-400'
                } ${alert.password && 'focus:border-red-400'}`}
                value={password.trim(/ /g, '')}
                name='password'
                onChange={handleChange}
              />
              {alert.password && (
                <small className='text-red-500 absolute left-0 top-[100%]'>
                  {alert.password}
                </small>
              )}
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
            <div className='form-control mb-6 relative'>
              <input
                type={showCfPassword ? 'text' : 'password'}
                placeholder='Nhập lại mật khẩu'
                className={`border-2 rounded-md w-full focus:border-blue-500 
                outline-none p-3 text-lg ${
                  alert.cfPassword && 'border-red-400'
                } ${alert.cfPassword && 'focus:border-red-400'}`}
                value={cfPassword.trim(/ /g, '')}
                name='cfPassword'
                onChange={handleChange}
              />
              {alert.cfPassword && (
                <small className='text-red-500 absolute left-0 top-[100%]'>
                  {alert.cfPassword}
                </small>
              )}
              {cfPassword.length > 0 && (
                <p
                  className='absolute right-2 top-1/2 border
                  -translate-y-1/2 cursor-pointer py-1 px-3 rounded-md 
                hover:bg-gray-200 hover:text-blue-600 transition-colors duration-200'
                  onClick={() => setShowCfPassword(!showCfPassword)}
                >
                  {showCfPassword ? 'Ẩn' : 'Hiện'}
                </p>
              )}
            </div>
            <div className='form-control mb-6 flex items-center text-gray-400'>
              <p className='text-lg flex-shrink-0 mr-5'>Giới tính</p>
              <select
                value={gender}
                name='gender'
                onChange={handleChange}
                className='outline-none border-2 rounded-md flex-1
                focus:border-blue-500 p-1 text-lg cursor-pointer'
              >
                <option value='male' className='p-2'>
                  Nam
                </option>
                <option value='female'>Nữ</option>
              </select>
            </div>

            <button
              type='submit'
              className='bg-[#00a400] hover:bg-[#048004]
            text-white text-lg font-semibold py-2.5 rounded-lg'
            >
              Đăng ký
            </button>
          </form>
          <Link
            to='/login'
            className='bg-blue-500 hover:bg-blue-600
            text-white font-semibold py-2 rounded-lg text-center w-[50%] mx-auto'
          >
            <p>Đăng nhập tài khoản</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
