import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {ACTION_TYPES} from '../../redux/actions/actionTypes'
import {AddUser, getConversations} from '../../redux/actions/messageActions'
import {getDataApi} from '../../utils/fetchDataApi'
import UserCardMessage from '../UserCardMessage'

function LeftSideMessage({messenger}) {
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])
  const {auth, message} = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()

  const handleCloseSearch = () => {
    setSearch('')
    setSearchUsers([])
  }

  useEffect(() => {
    if (message.firstLoad) return
    dispatch(getConversations(auth))
  }, [dispatch, auth, message.firstLoad])

  useEffect(() => {
    if (!search) {
      handleCloseSearch()
    }
  }, [search])

  useEffect(() => {
    if (!search) {
      handleCloseSearch()
    }
    const searchUsersFetch = async () => {
      if (search && auth.token) {
        try {
          const res = await getDataApi(`search?username=${search}`, auth.token)
          setSearchUsers(res.data.users)
        } catch (error) {
          dispatch({
            type: ACTION_TYPES.ALERT,
            payload: {
              error: error.response.data.message,
            },
          })
        }
      }
    }
    searchUsersFetch()
  }, [search, auth.token, dispatch])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search) {
      handleCloseSearch()
    }
    if (search && auth.token) {
      try {
        const res = await getDataApi(`search?username=${search}`, auth.token)
        setSearchUsers(res.data.users)
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.ALERT,
          payload: {
            error: error.response.data.message,
          },
        })
      }
    }
  }
  const handleAddChat = (user) => {
    handleCloseSearch()
    dispatch(AddUser({user, message}))
    history.push(`/messageall/${user._id}`)
  }
  return (
    <div
      className={`${
        messenger
          ? 'border-r dark:border-gray-600 overflow-y-hidden h-[30%] sm:h-full hidden lg:block flex-col items-center'
          : 'border-r dark:border-gray-600 overflow-y-hidden h-full lg:block flex-col items-center'
      }`}
    >
      <div className='p-5 border-b dark:border-gray-600 w-full'>
        <h3 className='font-bold text-2xl dark:text-gray-300 w-full'>Chat</h3>
        <div className='flex items-center px-1.5 bg-gray-100 rounded-full md:dark:bg-[#3a3b3c] mt-3 w-full'>
          <input
            type='text'
            placeholder='Tìm kiếm trên Messenger'
            className='bg-transparent outline-none border-0 flex-1
          focus:outline-none pl-3 w-full pr-5 dark:text-gray-300 py-2'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div
            className='p-1.5 bg-blue-500 rounded-full hidden sm:cursor-pointer dark:bg-[#18191a] relative sm:flex flex-shrink-0 w-8 h-8'
            onClick={handleSearch}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 hidden sm:block text-white dark:text-gray-300 m-auto flex-shrink-0'
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
      <div
        className={`leftSideMessage max-h-full lg:overflow-y-scroll ml-2 ${
          messenger ? 'flex lg:block max-w-full overflow-x-scroll' : ''
        }`}
      >
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user, i) => (
              <div
                key={i}
                className='md:cursor-pointer'
                onClick={() => handleAddChat(user)}
              >
                <UserCardMessage user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users?.length > 0 &&
              message.users?.map((user, i) => (
                <div
                  key={i}
                  className='md:cursor-pointer'
                  onClick={() => handleAddChat(user)}
                >
                  <UserCardMessage user={user} data={message.data} id={id} />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  )
}

export default LeftSideMessage
