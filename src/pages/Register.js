import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {register} from '../redux/actions/authActions'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showCfPassword, setShowCfPassword] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()
  const {auth, alert} = useSelector((state) => state)

  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    cfPassword: '',
    gender: 'male',
  })
  const {firstname, lastname, username, email, password, cfPassword, gender} =
    state

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
    <div className='register bg-[#f0f2f5] select-none h-screen flex items-start xl:items-center'>
      <div className='register-content sm:mx-20 md:mx-auto flex items-center flex-col md:flex-row w-full md:max-w-5xl mt-5'>
        <div className='register-left w-full md:w-[40%] mx-auto mb-5'>
          <p className='font-bold text-4xl md:text-5xl text-[#fe2c55] text-center'>
            Q Social
          </p>
          <p className='text-2xl font-medium mt-5 text-center hidden md:block'>
            Q Social giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </p>
        </div>
        <div className='register-righ w-full md:w-[50%] md:mx-auto flex flex-col bg-white rounded-lg shadow-md p-4'>
          <form
            className='flex flex-col border-b border-gray-300 pb-3 mb-3'
            onSubmit={handleSubmit}
          >
            <div className='flex items-center justify-between'>
              <div className='form-control mb-5 relative flex-1 mr-1.5'>
                <input
                  type='text'
                  placeholder='Họ *'
                  className={`border-[1px] sm:border-2 rounded-md w-full focus:border-[#fe2c55] 
                outline-none p-2 text-lg ${
                  alert.firstname && 'border-red-400'
                } ${alert.firstname && 'focus:border-red-400'}`}
                  value={firstname.trim(/ /g, '')}
                  name='firstname'
                  onChange={handleChange}
                />
                {alert.firstname && (
                  <small className='text-red-500 absolute left-0 top-[100%]'>
                    {alert.firstname}
                  </small>
                )}
              </div>
              <div className='form-control mb-5 relative flex-1 ml-1.5'>
                <input
                  type='text'
                  placeholder='Tên *'
                  className={`border-[1px] sm:border-2 rounded-md w-full focus:border-[#fe2c55] 
                outline-none p-2 text-lg ${
                  alert.lastname && 'border-red-400'
                } ${alert.lastname && 'focus:border-red-400'}`}
                  value={lastname.trim(/ /g, '')}
                  name='lastname'
                  onChange={handleChange}
                />
                {alert.lastname && (
                  <small className='text-red-500 absolute left-0 top-[100%]'>
                    {alert.lastname}
                  </small>
                )}
              </div>
            </div>
            <div className='form-control mb-5 relative'>
              <input
                type='text'
                placeholder='Tên người dùng *'
                className={`border-[1px] sm:border-2 rounded-md w-full focus:border-[#fe2c55] 
                outline-none p-2 text-lg ${
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
            <div className='form-control mb-5 relative'>
              <input
                type='email'
                placeholder='Email *'
                className={`border-[1px] sm:border-2 rounded-md w-full focus:border-[#fe2c55] 
                outline-none p-2 text-lg ${alert.email && 'border-red-400'} ${
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
            <div className='form-control mb-5 relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Mật khẩu *'
                className={`border-[1px] sm:border-2 rounded-md w-full focus:border-[#fe2c55] 
                outline-none p-2 text-lg ${
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
            <div className='form-control mb-5 relative'>
              <input
                type={showCfPassword ? 'text' : 'password'}
                placeholder='Nhập lại mật khẩu *'
                className={`border-[1px] sm:border-2 rounded-md w-full focus:border-[#fe2c55] 
                outline-none p-2 text-lg ${
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
                  -translate-y-1/2 md:cursor-pointer py-1 px-3 rounded-md 
                md:hover:bg-gray-200 text-[#fe2c55] transition-colors duration-200'
                  onClick={() => setShowCfPassword(!showCfPassword)}
                >
                  {showCfPassword ? (
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
            <div className='form-control mb-5 flex items-center text-gray-400'>
              <p className='text-lg flex-shrink-0 mr-5'>Giới tính</p>
              <select
                value={gender}
                name='gender'
                onChange={handleChange}
                className='outline-none border-[1px] sm:border-2 rounded-md flex-1
                focus:border-[#fe2c55] p-2 text-lg md:cursor-pointer'
              >
                <option value='male' className='p-2'>
                  Nam
                </option>
                <option value='female'>Nữ</option>
              </select>
            </div>

            <button
              type='submit'
              className='bg-[#fe2c55] md:hover:bg-[#e91b44] text-white text-lg font-semibold py-2.5 rounded-lg'
            >
              Đăng ký
            </button>
          </form>
          <Link
            to='/login'
            className='bg-white border border-[#fe2c55]
            text-[#fe2c55] font-semibold py-2 rounded-lg text-center w-full sm:w-[50%] mx-auto'
          >
            <p>Đăng nhập tài khoản</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
