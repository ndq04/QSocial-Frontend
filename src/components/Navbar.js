import {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {AccountContext} from '../contexts/AccountContext'
import useDarkMode from '../hooks/useDarkMode'
import {ACTION_TYPES} from '../redux/actions/actionTypes'
import {logout} from '../redux/actions/authActions'
import {getDataApi} from './../utils/fetchDataApi'
import UserCard from './UserCard'

function Navbar() {
  const [colorTheme, setTheme] = useDarkMode()
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])
  const [load, setLoad] = useState(false)

  const {isOpen, handleToggle, handleClose} = useContext(AccountContext)
  const [showInput, setShowInput] = useState(false)

  const dispatch = useDispatch()
  const {auth} = useSelector((state) => state)

  const handleCloseSearch = () => {
    setSearch('')
    setSearchUsers([])
    setShowInput(false)
  }

  const toggleShowInput = () => setShowInput(!showInput)

  useEffect(() => {
    if (!search) {
      handleCloseSearch()
    }
    if (search && auth.token) {
      setLoad(true)
      getDataApi(`search?username=${search}`, auth.token)
        .then((res) => {
          setSearchUsers(res.data.users)
          setLoad(false)
        })
        .catch((error) => {
          dispatch({
            type: ACTION_TYPES.ALERT,
            payload: {
              error: error.response.data.message,
            },
          })
        })
    }
  }, [search, auth.token, dispatch])

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất ?')) {
      dispatch(logout())
    }
  }

  return (
    <nav
      className='bg-white sm:shadow-md w-full h-[60px] px-4 sm:grid grid-cols-2 
      lg:grid-cols-3 xl:grid-cols-4 fixed select-none z-20 flex flex-col top-0 
      dark:bg-[#242526] dark:border-b-[1px] border-gray-900'
      onClick={handleClose}
    >
      <div
        className='nav-left w-full flex items-center relative 
        col-span-1 lg:col-span-2 xl:col-span-1 justify-between sm:justify-start'
      >
        <div className='flex-shrink-0' onClick={handleCloseSearch}>
          <Link to='/'>
            <img
              src='https://i.imgur.com/iDuSx6e.png'
              alt='logo'
              className='w-12 h-12 rounded-full hidden sm:block'
            />
          </Link>
          <Link to='/'>
            <h3 className='text-blue-500 font-bold text-xl sm:hidden'>
              Q Social
            </h3>
          </Link>
        </div>
        <div className='flex items-center'>
          <form className='relative flex items-center ml-2 p-2 sm:bg-gray-100 rounded-full sm:w-full sm:dark:bg-[#3a3b3c]'>
            <div
              className='sm:hidden text-blue-600 sm:sm:cursor-pointer p-2 bg-gray-100 
            rounded-full translate-x-[8px]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                onClick={toggleShowInput}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 hidden sm:block text-gray-600 dark:text-gray-300'
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
              className='hidden sm:block bg-transparent outline-none border-0 
              focus:outline-none pl-3 w-full pr-10 dark:text-gray-300'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {load && (
              <div className='lds-facebook lds-search'>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </form>
          <div
            className='sm:hidden ml-3 sm:cursor-pointer text-blue-600 
        sm:hover:text-white p-1.5 rounded-full sm:hover:bg-blue-500'
            onClick={handleToggle}
          >
            {!isOpen ? (
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
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </div>
        </div>
        {showInput && (
          <div className='fixed inset-0 bg-white z-10 p-3 dark:bg-[#18191a]'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7 sm:cursor-pointer dark:text-gray-300'
                viewBox='0 0 20 20'
                fill='currentColor'
                onClick={toggleShowInput}
              >
                <path
                  fillRule='evenodd'
                  d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                  clipRule='evenodd'
                />
              </svg>
              <input
                type='text'
                placeholder='Tìm kiếm trên QSocial'
                className='outline-none border-0 bg-[#f0f2f5] dark:bg-[#3a3b3c] dark:text-gray-300 w-full rounded-full px-4 py-2 ml-3'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}
        {searchUsers.length > 0 && (
          <div
            className='absolute top-[100%] left-[-16px] w-[calc(100%+32px)] h-[100vh] overflow-y-scroll border-t-2 
          bg-white rounded-r-lg shadow-md drop-shadow-lg px-2 flex flex-col z-20 dark:bg-[#242526] dark:border-t-0 dark:rounded-none'
          >
            <div
              className='flex self-end p-1.5 rounded-full 
            hover:bg-gray-300 sm:cursor-pointer my-2 flex-shrink-0 dark:hover:bg-[#414345]'
              onClick={handleCloseSearch}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 m-auto dark:text-gray-200'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </div>
            {searchUsers.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                handleCloseSearch={handleCloseSearch}
              />
            ))}
          </div>
        )}
      </div>

      <div className='nav-center hidden xl:col-span-2 xl:flex items-center justify-around px-6'>
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

      <div className='nav-right flex items-center justify-between sm:justify-end relative'>
        <div
          className='user hover:bg-[#f0f2f5] dark:hover:bg-[#414345]
          sm:cursor-pointer transition-colors p-2 sm:px-2 sm:p-1 rounded-full hidden sm:block'
        >
          <Link
            to={`/profile/${auth.user._id}`}
            className='flex items-center flex-row-reverse sm:flex-row'
            onClick={handleCloseSearch}
          >
            <img
              src={auth.user.avatar}
              alt='avatar'
              className='w-10 h-10 rounded-full object-cover flex-shrink-0'
            />
            <p className='text-gray-600 font-semibold mx-2 hidden sm:block dark:text-gray-200'>
              {auth.user.lastname}
            </p>
          </Link>
        </div>

        <div className='items-center justify-end hidden sm:flex'>
          <div
            className='message ml-5 bg-[#e4e6eb] rounded-full 
            hover:bg-gray-300 sm:cursor-pointer p-0.5 dark:bg-[#3a3b3c] dark:hover:bg-[#6a6b6c]'
          >
            <Link to='/message' className='flex w-10 h-10'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 m-auto dark:text-gray-200'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          </div>

          <div
            className='notify ml-4 bg-[#e4e6eb] rounded-full 
            hover:bg-gray-200 sm:cursor-pointer p-0.5 dark:bg-[#3a3b3c] dark:hover:bg-[#6a6b6c]'
          >
            <Link to='/notify' className='flex w-10 h-10 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 m-auto dark:text-gray-200'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
              </svg>
            </Link>
          </div>

          <div
            className='account ml-4 bg-[#e4e6eb] rounded-full
            hover:bg-gray-200 sm:cursor-pointer relative p-0.5 dark:bg-[#3a3b3c] dark:hover:bg-[#6a6b6c]'
            onClick={handleToggle}
          >
            <div className='flex w-10 h-10 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-6 w-6 m-auto dark:text-gray-200 ${
                  isOpen ? 'text-blue-600' : ''
                }`}
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
              {isOpen && (
                <div
                  className='absolute right-0 top-[120%] w-[350px] border-t-2 
                bg-white rounded-lg shadow-md drop-shadow-lg p-2 dark:bg-[#242526] dark:border dark:border-gray-700'
                >
                  <ul>
                    <Link to={`/profile/${auth.user._id}`}>
                      <li
                        className='flex items-center p-2 rounded-md 
                    hover:bg-[#f0f2f5] sm:cursor-pointer transition-colors dark:hover:bg-[#414345]'
                      >
                        <img
                          src={auth.user.avatar}
                          alt='avatar'
                          className='w-16 h-16 object-cover rounded-full mr-3'
                        />
                        <p className='text-gray-800 font-semibold dark:text-gray-200'>
                          {auth.user.firstname} {auth.user.lastname}
                        </p>
                      </li>
                    </Link>
                    <li className='m-3 w-[95%] mx-auto h-[0.5px] bg-gray-400'></li>
                    <li
                      className='flex items-center p-2 rounded-md 
                    hover:bg-[#f0f2f5] sm:cursor-pointer transition-colors dark:hover:bg-[#414345]'
                      onClick={handleLogout}
                    >
                      <p className='flex w-9 h-9 rounded-full bg-gray-400 mr-6'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6 m-auto dark:text-gray-200'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                          />
                        </svg>
                      </p>
                      <p className='text-gray-800 font-semibold dark:text-gray-200'>
                        Đăng xuất
                      </p>
                    </li>
                    <li
                      className='flex items-center p-2 rounded-md 
                    hover:bg-[#f0f2f5] sm:cursor-pointer transition-colors dark:hover:bg-[#414345]'
                      onClick={() => setTheme(colorTheme)}
                    >
                      <div className='flex w-9 h-9 rounded-full bg-gray-400 mr-6'>
                        {colorTheme === 'dark' ? (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 m-auto'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6  m-auto dark:text-purple-600'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                            />
                          </svg>
                        )}
                      </div>
                      <p className='text-gray-800 font-semibold dark:text-gray-200'>
                        <span>Giao diện</span>
                        {colorTheme === 'dark' ? (
                          <span className='ml-2 font-bold text-yellow-500'>
                            Sáng
                          </span>
                        ) : (
                          <span className='ml-2 font-bold text-purple-500'>
                            Tối
                          </span>
                        )}
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className='sm:hidden absolute right-0 top-[115%] w-full border-t-2 
          bg-white rounded-lg shadow-md drop-shadow-lg p-2 dark:bg-[#18191a] dark:border dark:border-gray-700'
          >
            <ul>
              <Link to={`/profile/${auth.user._id}`}>
                <li
                  className='flex items-center p-2 rounded-md dark:hover:bg-[#414345]
                    hover:bg-[#f0f2f5] sm:cursor-pointer transition-colors'
                >
                  <img
                    src={auth.user.avatar}
                    alt='avatar'
                    className='w-16 h-16 object-cover rounded-full mr-3'
                  />
                  <p className='text-gray-800 font-semibold dark:text-gray-300'>
                    {auth.user.firstname} {auth.user.lastname}
                  </p>
                </li>
              </Link>
              <li className='m-3 w-[95%] mx-auto h-[0.5px] bg-gray-400'></li>
              <li
                className='flex items-center p-2 rounded-md dark:hover:bg-[#414345]
                    hover:bg-[#f0f2f5] sm:cursor-pointer transition-colors'
                onClick={handleLogout}
              >
                <p className='flex w-8 h-8 rounded-full bg-gray-400 mr-6'>
                  <i
                    data-visualcompletion='css-img'
                    className='logout-icon m-auto'
                  ></i>
                </p>
                <p className='text-gray-800 font-semibold dark:text-gray-300'>
                  Đăng xuất
                </p>
              </li>
              <li
                className='flex items-center p-2 rounded-md 
                    hover:bg-[#f0f2f5] sm:cursor-pointer transition-colors dark:hover:bg-[#414345]'
                onClick={() => setTheme(colorTheme)}
              >
                <div className='flex w-9 h-9 rounded-full bg-gray-400 mr-6'>
                  {colorTheme === 'dark' ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 m-auto'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6  m-auto dark:text-purple-600'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                      />
                    </svg>
                  )}
                </div>
                <p className='text-gray-800 font-semibold dark:text-gray-200'>
                  <span>Giao diện</span>
                  {colorTheme === 'dark' ? (
                    <span className='ml-2 font-bold text-yellow-500'>Sáng</span>
                  ) : (
                    <span className='ml-2 font-bold text-purple-500'>Tối</span>
                  )}
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
