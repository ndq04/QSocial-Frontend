import {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import StatusModal from '../components/home/post/StatusModal'
import Info from '../components/profile/Info'
import ProfileBody from '../components/profile/ProfileBody'
import {StatusContext} from '../contexts/StatusContext'
import {getUserPost} from '../redux/actions/postActions'
import {getProfileUsers} from '../redux/actions/profileActions'
import Followings from './../components/profilePage/Followings'
import Friends from './../components/profilePage/Friends'
import Saved from './../components/profilePage/Saved'

function Profile() {
  const {showStatus} = useContext(StatusContext)
  const [userData, setUserData] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const {id} = useParams()
  const {auth, profile, homePost} = useSelector((state) => state)
  const dispatch = useDispatch()

  const [showAccount, setShowAccount] = useState(true)
  const [showFriends, setShowFriends] = useState(false)
  const [showFollowings, setShowFollowings] = useState(false)
  const [showSaved, setShowSaved] = useState(false)

  const handleToggle = (value) => {
    switch (value) {
      case 'showAccount':
        setShowAccount(true)
        setShowFriends(false)
        setShowFollowings(false)
        setShowSaved(false)
        break
      case 'showFriends':
        setShowAccount(false)
        setShowFriends(true)
        setShowFollowings(false)
        setShowSaved(false)
        break
      case 'showFollowings':
        setShowAccount(false)
        setShowFriends(false)
        setShowFollowings(true)
        setShowSaved(false)
        break
      default:
        setShowAccount(false)
        setShowFriends(false)
        setShowFollowings(false)
        setShowSaved(true)
        break
    }
  }

  useEffect(() => {
    dispatch(getUserPost({id, token: auth.token}))
  }, [dispatch, auth.token, id])

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      setUserData([auth.user])
      setUserPosts(homePost.userpost)
    } else {
      dispatch(getProfileUsers({users: profile.users, id, auth}))
      const newData = profile.users.filter((user) => user._id === id)
      setUserData(newData)
      setUserPosts(homePost.userpost)
    }
  }, [id, auth.user, auth, dispatch, profile.users, homePost.userpost])

  const data = {userData, profile, auth, id, userPosts}
  return (
    userData && (
      <>
        <div className='bg-[#f0f2f5] select-none pt-[60px]'>
          <div className='profile h-[calc(100vh-60px)] overflow-y-scroll'>
            <Info {...data} />
            {auth && auth.user && id === auth.user._id && (
              <div
                className='profileheader bg-white max-w-5xl h-[50px] shadow-md
                mx-auto rounded-b-lg flex items-center justify-between overflow-hidden mb-4'
              >
                <div
                  className={`flex flex-1 h-full border-r-2 border-gray-300 
                cursor-pointer transition-colors ${
                  showAccount && 'border-t-[3px] border-t-purple-500'
                }`}
                  onClick={() => handleToggle('showAccount')}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8 text-blue-500 m-auto'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>

                <div
                  className={`flex items-center justify-center flex-1 h-full border-r-2 border-gray-300 
                cursor-pointer transition-colors ${
                  showFriends && 'border-t-[3px] border-t-purple-500'
                }`}
                  onClick={() => handleToggle('showFriends')}
                >
                  <img
                    src='https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png'
                    alt='friend'
                    className='w-8 h-8 mx-2'
                  />
                  <p className='font-semibold text-purple-800'>
                    Người theo dõi
                  </p>
                </div>

                <div
                  className={`flex items-center justify-center flex-1 h-full border-r-2 border-gray-300 
                cursor-pointer transition-colors ${
                  showFollowings && 'border-t-[3px] border-t-purple-500'
                }`}
                  onClick={() => handleToggle('showFollowings')}
                >
                  <img
                    src='https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/6U-6vx-bOzP.png'
                    alt='following'
                    className='w-[22px] h-[22px] mx-2'
                  />
                  <p className='font-semibold text-purple-800'>Đang theo dõi</p>
                </div>

                <div
                  className={`flex items-center justify-center flex-1 h-full border-r-2 border-gray-300 
                cursor-pointer transition-colors ${
                  showSaved && 'border-t-[3px] border-t-purple-500'
                }`}
                  onClick={() => handleToggle('showSaved')}
                >
                  <img
                    src='https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png'
                    alt='save'
                    className='w-7 h-7 mx-2'
                  />
                  <p className='font-semibold text-purple-800'>Đã lưu</p>
                </div>
              </div>
            )}
            {showAccount && (
              <ProfileBody {...data} handleToggle={handleToggle} />
            )}
            {showFriends && auth && auth.user && id === auth.user._id && (
              <Friends {...data} />
            )}
            {showFollowings && auth && auth.user && id === auth.user._id && (
              <Followings {...data} />
            )}
            {showSaved && <Saved />}
          </div>
        </div>
        {showStatus && <StatusModal />}
      </>
    )
  )
}

export default Profile
