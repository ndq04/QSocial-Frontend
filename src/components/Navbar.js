import {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../redux/actions/authActions'
import {AccountContext} from '../contexts/AccountContext'
import {getDataApi} from './../utils/fetchDataApi'

function Navbar() {
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])

  const {isOpen, handleToggle, handleClose} = useContext(AccountContext)
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  const dispatch = useDispatch()
  const {auth} = useSelector((state) => state)

  useEffect(() => {
    if (search && auth.token) {
      getDataApi(`search?username=${search}`, auth.token).then((res) =>
        console.log(res)
      )
    }
  }, [search, auth.token])

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất ?')) {
      dispatch(logout())
    }
  }

  return (
    <nav
      className='bg-white shadow-md w-full h-[60px] px-4 grid grid-cols-4 fixed select-none'
      onClick={handleClose}
    >
      <div className='nav-left h-full flex items-center'>
        <Link to='/'>
          <img
            src={PublicFolder + 'logo.png'}
            alt='logo'
            className='w-12 h-12 rounded-full hidden sm:block'
          />
        </Link>
        <Link to='/'>
          <h3 className='text-blue-500 font-bold text-xl sm:hidden'>
            Q Social
          </h3>
        </Link>
        <form className='flex items-center ml-2 p-2 bg-gray-100 rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          <input
            type='text'
            placeholder='Tìm kiếm trên QSocial'
            className='bg-gray-100 outline-none border-0 focus:outline-none px-6 text-lg'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className='nav-center col-span-2 flex items-center justify-around px-6'>
        <img
          src='https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png'
          alt='home'
          className='w-8 h-8 rounded-full mr-2'
        />

        <img
          src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png'
          alt='watch'
          className='w-8 h-8 rounded-full mr-2'
        />

        <img
          src='https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/l6e-P1BHJLy.png'
          alt='date'
          className='w-8 h-8 rounded-full mr-2'
        />

        <img
          src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png'
          alt='group'
          className='w-8 h-8 rounded-full mr-2'
        />

        <img
          src='https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/uGfRd5KPhOI.png'
          alt='video'
          className='w-8 h-8 rounded-full mr-2'
        />
      </div>

      <div className='nav-right flex items-center justify-end'>
        <Link to={`/profile/${auth.user._id}`}>
          <div className='user flex items-center hover:bg-gray-100 cursor-pointer transition-colors py-1 px-2 rounded-full'>
            <img
              src={auth.user.avatar || PublicFolder + 'user.png'}
              alt='avatar'
              className='w-9 h-9 object-cover rounded-full mr-2'
            />
            <p className='text-gray-600 font-semibold'>{auth.user.fullname}</p>
          </div>
        </Link>

        <Link to='/message'>
          <div
            className='message ml-5 flex w-10 h-10 bg-gray-100 rounded-full 
        hover:bg-gray-200 cursor-pointer border'
          >
            <svg
              viewBox='0 0 28 28'
              alt=''
              className='a8c37x1j ms05siws hwsy1cff b7h9ocf4 fzdkajry m-auto'
              height='20'
              width='20'
            >
              <path d='M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z'></path>
            </svg>
          </div>
        </Link>

        <Link to='/notify'>
          <div
            className='notify ml-4 flex w-10 h-10 bg-gray-100 rounded-full 
          hover:bg-gray-200 cursor-pointer border'
          >
            <svg
              viewBox='0 0 28 28'
              alt=''
              className='a8c37x1j ms05siws hwsy1cff b7h9ocf4 eltiug27 m-auto'
              height='20'
              width='20'
            >
              <path d='M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z'></path>
            </svg>
          </div>
        </Link>

        <div
          className={`account ml-4 flex w-10 h-10 bg-gray-100 rounded-full
          hover:bg-gray-200 cursor-pointer border relative ${
            isOpen && 'bg-blue-500 hover:bg-blue-500'
          }`}
          onClick={handleToggle}
        >
          <svg
            viewBox='0 0 20 20'
            width='1.3em'
            height='1.3em'
            className='a8c37x1j ms05siws hwsy1cff b7h9ocf4 fzdkajry jnigpg78 odw8uiq3 m-auto text-gray-100'
          >
            <path d='M10 14a1 1 0 0 1-.755-.349L5.329 9.182a1.367 1.367 0 0 1-.205-1.46A1.184 1.184 0 0 1 6.2 7h7.6a1.18 1.18 0 0 1 1.074.721 1.357 1.357 0 0 1-.2 1.457l-3.918 4.473A1 1 0 0 1 10 14z'></path>
          </svg>
          {isOpen && (
            <div
              className='absolute right-0 top-[120%] w-[350px] h-[200px] border-t-2 
            bg-white rounded-lg shadow-md drop-shadow-lg p-2'
            >
              <ul>
                <li className='flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer'>
                  <img
                    src={auth.user.avatar || PublicFolder + 'user.png'}
                    alt='avatar'
                    className='w-14 h-14 object-cover rounded-full mr-3'
                  />
                  <p className='text-gray-800 font-semibold'>
                    {auth.user.fullname}
                  </p>
                </li>
                <li className='m-3 w-[95%] mx-auto h-[0.5px] bg-gray-400'></li>
                <li
                  className='flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer'
                  onClick={handleLogout}
                >
                  <p className='flex w-10 h-10 rounded-full bg-gray-400 mr-3'>
                    <i
                      data-visualcompletion='css-img'
                      className='logout-icon m-auto'
                    ></i>
                  </p>
                  <p className='text-gray-800 font-semibold'>Đăng xuất</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
