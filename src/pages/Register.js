import {useState} from 'react'

function Register() {
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfPassword, setCfPassword] = useState('')
  const [gender, setGender] = useState('male')

  const [showPassword, setShowPassword] = useState(false)
  const [showCfPassword, setShowCfPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      fullname,
      username,
      email,
      password,
      cfPassword,
      gender,
    })
  }

  return (
    <div className='register bg-[#f0f2f5] select-none h-screen flex items-center'>
      <div className='register-content m-auto flex items-center'>
        <div className='register-left w-[50%]'>
          <p className='font-bold text-6xl text-blue-500'>Q Social</p>
          <p className='text-2xl font-medium mt-5'>
            Q Social giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </p>
        </div>
        <div className='register-right flex flex-col bg-white rounded-lg shadow-md px-4 py-10 w-[40%] mr-10'>
          <form
            className='flex flex-col border-b border-gray-300 pb-5 mb-5'
            onSubmit={handleSubmit}
          >
            <div className='form-control mb-4'>
              <input
                type='text'
                required
                placeholder='Họ và tên'
                className='border-2 rounded-md w-full
              focus:border-blue-500 outline-none p-3 text-lg'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className='form-control mb-4'>
              <input
                type='text'
                required
                placeholder='Tên đăng nhập'
                className='border-2 rounded-md w-full
              focus:border-blue-500 outline-none p-3 text-lg'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='form-control mb-4'>
              <input
                type='email'
                required
                placeholder='Email'
                className='border-2 rounded-md w-full
              focus:border-blue-500 outline-none p-3 text-lg'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-control mb-4 relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder='Mật khẩu'
                className='border-2 rounded-md w-full
              focus:border-blue-500 outline-none p-3 text-lg'
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
            <div className='form-control mb-4 relative'>
              <input
                type={showCfPassword ? 'text' : 'password'}
                required
                placeholder='Nhập lại mật khẩu'
                className='border-2 rounded-md w-full
              focus:border-blue-500 outline-none p-3 text-lg'
                value={cfPassword}
                onChange={(e) => setCfPassword(e.target.value)}
              />
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
            <div className='form-control mb-4'>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className='outline-none border-2 rounded-md w-full
                focus:border-blue-500 p-3 text-lg cursor-pointer'
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
          <button
            className='bg-blue-500 hover:bg-blue-600
            text-white text-lg font-semibold py-2.5 rounded-lg text-center w-[50%] mx-auto'
          >
            Đăng nhập tài khoản
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
