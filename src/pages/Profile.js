import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import ProfileStatusModal from '../components/profile/ProfileStatusModal'
import {useContext} from 'react'
import {StatusContext} from '../contexts/StatusContext'
import Info from '../components/profile/Info'
import ProfileBody from '../components/profile/ProfileBody'
import {getProfileUsers} from '../redux/actions/profileActions'
import Friends from './../components/profilePage/Friends'
import Followings from './../components/profilePage/Followings'
import Saved from './../components/profilePage/Saved'

function Profile() {
  const {isOpenModal} = useContext(StatusContext)
  const [userData, setUserData] = useState([])
  const {id} = useParams()
  const {auth, profile} = useSelector((state) => state)
  const dispatch = useDispatch()

  const [showAccount, setShowAccount] = useState(true)
  const [showFriens, setShowFriens] = useState(false)
  const [showFollowings, setShowFollowings] = useState(false)
  const [showSaved, setShowSaved] = useState(false)

  const handleToggle = (value) => {
    switch (value) {
      case 'showAccount':
        setShowAccount(true)
        setShowFriens(false)
        setShowFollowings(false)
        setShowSaved(false)
        break
      case 'showFriens':
        setShowAccount(false)
        setShowFriens(true)
        setShowFollowings(false)
        setShowSaved(false)
        break
      case 'showFollowings':
        setShowAccount(false)
        setShowFriens(false)
        setShowFollowings(true)
        setShowSaved(false)
        break
      default:
        setShowAccount(false)
        setShowFriens(false)
        setShowFollowings(false)
        setShowSaved(true)
        break
    }
  }

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      setUserData([auth.user])
    } else {
      dispatch(getProfileUsers({users: profile.users, id, auth}))
      const newData = profile.users.filter((user) => user._id === id)
      setUserData(newData)
    }
  }, [id, auth.user, auth, dispatch, profile.users])

  const data = {userData, profile, auth, id}
  return (
    userData && (
      <>
        <div className='bg-[#f0f2f5] select-none pt-[60px]'>
          <div className='profile h-[calc(100vh-60px)] overflow-y-scroll'>
            <Info {...data} />
            <div
              className='profileheader bg-white max-w-5xl h-[60px] shadow-md
              mx-auto mb-4 rounded-lg flex items-center justify-between overflow-hidden'
            >
              <div
                className='flex flex-1 h-full border-r-2 border-gray-300 
              hover:bg-gray-300 cursor-pointer transition-colors'
                onClick={() => handleToggle('showAccount')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-9 w-9 text-blue-500 m-auto'
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
                className='flex flex-1 h-full border-r-2 border-gray-300
              hover:bg-gray-300 cursor-pointer transition-colors'
                onClick={() => handleToggle('showFriens')}
              >
                <img
                  src='https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png'
                  alt='friend'
                  className='m-auto'
                />
              </div>

              <div
                className='flex flex-1 h-full border-r-2 border-gray-300
              hover:bg-gray-300 cursor-pointer transition-colors'
                onClick={() => handleToggle('showFollowings')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-9 w-9 text-blue-500 m-auto'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
                </svg>
              </div>

              <div
                className='flex flex-1 h-full hover:bg-gray-300 cursor-pointer 
                transition-colors'
                onClick={() => handleToggle('showSaved')}
              >
                <img
                  src='https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png'
                  alt='save'
                  className='m-auto'
                />
              </div>
            </div>
            {showAccount && <ProfileBody {...data} />}
            {showFriens && <Friends {...data} />}
            {showFollowings && <Followings {...data} />}
            {showSaved && <Saved />}
          </div>
        </div>
        {isOpenModal && <ProfileStatusModal {...data} />}
      </>
    )
  )
}

export default Profile
