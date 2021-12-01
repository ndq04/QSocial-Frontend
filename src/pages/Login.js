import {useState} from 'react'
// import {Link} from 'react-router-dom'
import {login} from '../redux/actions/authActions'
import {useDispatch} from 'react-redux'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState({email, password})
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUserData({email, password})
    await dispatch(login(userData))
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
                className='border-2 rounded-md w-full 
              focus:border-blue-500 outline-none py-3 px-3 text-lg'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-control relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder='Mật khẩu'
                className='border-2 rounded-md w-full
              focus:border-blue-500 outline-none py-3 px-3 text-lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <button
            className='bg-[#00a400] hover:bg-[#048004]
            text-white text-lg font-semibold py-2.5 rounded-lg text-center w-[50%] mx-auto'
          >
            Tạo tài khoản mới
          </button>
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
