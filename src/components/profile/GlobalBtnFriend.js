import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {followfriend, unfollowfriend} from '../../redux/actions/profileActions'

function GlobalBtnFriend({user}) {
  const [isFollow, setIsFollow] = useState(false)
  const {auth, profile} = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.user.followings.find((item) => item._id === user._id)) {
      setIsFollow(true)
    }
  }, [auth.user.followings, user._id])

  const follow = () => {
    dispatch(followfriend({users: profile.users, user, auth}))
    setIsFollow(true)
  }

  const unfollow = () => {
    dispatch(unfollowfriend({users: profile.users, user, auth}))
    setIsFollow(false)
  }

  return (
    <div className='absolute right-[5%] flex'>
      {isFollow ? (
        <button
          className='py-2 px-3 bg-red-500 hover:bg-red-600 
          rounded-lg font-semibold flex items-center text-white'
          onClick={unfollow}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mr-1'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z' />
          </svg>
          <span>Bỏ theo dõi</span>
        </button>
      ) : (
        <button
          className=' py-2 px-3 bg-blue-500 hover:bg-blue-700 
          rounded-lg text-white font-semibold flex items-center'
          onClick={follow}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mr-1'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
          </svg>
          <span>Theo dõi</span>
        </button>
      )}
    </div>
  )
}

export default GlobalBtnFriend
