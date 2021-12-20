import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ACTION_TYPES} from '../../redux/actions/actionTypes'
import {getDataApi} from '../../utils/fetchDataApi'
import UserCardMessage from '../UserCardMessage'

function LeftSideMessage() {
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])
  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleCloseSearch = () => {
    setSearch('')
    setSearchUsers([])
  }

  useEffect(() => {
    if (!search) {
      handleCloseSearch()
    }
    if (search && auth.token) {
      getDataApi(`search?username=${search}`, auth.token)
        .then((res) => {
          setSearchUsers(res.data.users)
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

  const handleAddChat = (user) => {
    setSearch('')
    setSearchUsers([])
    // dispatch(AddUser(user))
  }
  return (
    <div className='border-r dark:border-gray-600 overflow-y-hidden'>
      <div className='p-5 border-b dark:border-gray-600'>
        <h3 className='font-bold text-2xl dark:text-gray-300'>Chat</h3>
        <div className='flex items-center px-1.5 sm:bg-gray-100 rounded-full sm:dark:bg-[#3a3b3c] mt-3'>
          <input
            type='text'
            placeholder='Tìm kiếm trên Messenger'
            className='hidden sm:block bg-transparent outline-none border-0 
          focus:outline-none pl-3 w-full pr-5 dark:text-gray-300 py-2'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className='p-1.5 bg-blue-500 rounded-full sm:cursor-pointer dark:bg-[#18191a] relative'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 hidden sm:block text-white dark:text-gray-300'
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
          </div>
        </div>
      </div>
      <div className='max-h-full overflow-y-scroll px-2'>
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user, i) => (
              <div
                key={i}
                className='cursor-pointer'
                onClick={() => handleAddChat(user)}
              >
                <UserCardMessage user={user} />
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default LeftSideMessage
