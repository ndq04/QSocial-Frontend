import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {login} from '../redux/actions/authActions'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const {email, password} = state
  const {auth} = useSelector((state) => state)
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
    <div className='login bg-[#f0f2f5] select-none h-screen flex items-start xl:items-center z-10'>
      <div className='login-content sm:mx-20 md:mx-auto flex items-center flex-col-reverse md:flex-row w-full md:max-w-5xl pt-20'>
        <div className='login-left w-full md:w-[50%] md:mx-auto flex flex-col bg-white rounded-lg shadow-md px-4 py-10'>
          <form
            className='flex flex-col border-b border-gray-300 pb-5 mb-5'
            onSubmit={handleSubmit}
          >
            <div className='form-control mb-6 relative'>
              <input
                type='text'
                placeholder='Email'
                className='border-[1px] sm:border-2 rounded-md w-full focus:border-[#fe2c55] 
                outline-none py-2 px-3 text-lg'
                value={email}
                name='email'
                onChange={handleChange}
              />
            </div>
            <div className='form-control relative mb-6'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Mật khẩu'
                className='border-[1px] sm:border-2 rounded-md w-full focus:border-[#fe2c55] 
                outline-none py-2 px-3 text-lg'
                value={password}
                name='password'
                onChange={handleChange}
              />
              {password.length > 0 && (
                <p
                  className='absolute right-2 top-1/2 border
                  -translate-y-1/2 md:cursor-pointer py-1 px-3 rounded-md 
                md:hover:bg-gray-200 text-[#fe2c55] transition-colors duration-200'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z'
                        clipRule='evenodd'
                      />
                      <path d='M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z' />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                      <path
                        fillRule='evenodd'
                        d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='bg-[#fe2c55] md:hover:bg-[#e91b44]
              text-white text-lg font-semibold py-2.5 rounded-lg'
            >
              Đăng nhập
            </button>
          </form>
          <Link
            to='/register'
            className='bg-white border border-[#fe2c55]
              text-[#fe2c55] font-semibold py-1.5 rounded-lg text-center w-[50%] mx-auto'
          >
            <p>Tạo tài khoản mới</p>
          </Link>
        </div>
        <div className='login-right w-full md:w-[40%] mx-auto mb-5'>
          <p className='font-bold text-4xl md:text-5xl text-[#fe2c55] text-center'>
            Q Social
          </p>
          <p className='text-2xl font-medium mt-5 hidden md:block text-center'>
            Q Social giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
