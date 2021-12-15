import {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import StatusModal from '../components/home/post/StatusModal'
import Info from '../components/profile/Info'
import ProfileBody from '../components/profile/ProfileBody'
import Photos from '../components/profilePage/Photos'
import {StatusContext} from '../contexts/StatusContext'
import {getUserPost} from '../redux/actions/postActions'
import {getProfileUsers} from '../redux/actions/profileActions'
import Followings from './../components/profilePage/Followings'
import Friends from './../components/profilePage/Friends'
import Saved from './../components/profilePage/Saved'
import {ProfileContext} from './../contexts/ProfileContext'

function Profile() {
  const {showStatus} = useContext(StatusContext)
  const {showAccount, showFriends, showFollowings, showSaved, showPhotos} =
    useContext(ProfileContext)
  const [userData, setUserData] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [photos, setPhotos] = useState([])

  const {id} = useParams()
  const {auth, profile, homePost} = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserPost({id, token: auth.token}))
  }, [dispatch, auth.token, id])

  useEffect(() => {
    const filterImages = userPosts.filter((item) => item.images.length > 0)
    const profileImages = filterImages.map((item) => item.images)
    setPhotos(profileImages)
  }, [userPosts])

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      setUserData([auth.user])
      setUserPosts(homePost.userpost)
    } else {
      if (profile.ids.every((item) => item !== id))
        dispatch(getProfileUsers({users: profile.users, id, auth}))
      const newData = profile.users.filter((user) => user._id === id)
      setUserData(newData)

      const newPosts = profile.userposts.filter((item) => item._id === id)
      setUserPosts(newPosts)
      setUserPosts(homePost.userpost)
    }
  }, [
    id,
    auth.user,
    auth,
    dispatch,
    profile.users,
    profile.ids,
    profile.userposts,
    homePost.userpost,
  ])

  const data = {userData, profile, auth, id, userPosts}
  return (
    userData && (
      <>
        <div className='bg-[#f0f2f5] select-none pt-[60px]'>
          <div className='profile h-[calc(100vh-60px)] overflow-y-scroll'>
            <Info {...data} />
            {showAccount && <ProfileBody {...data} photos={photos} />}
            {showFriends && auth && auth.user && id === auth.user._id && (
              <Friends {...data} />
            )}
            {showFollowings && auth && auth.user && id === auth.user._id && (
              <Followings {...data} />
            )}
            {showSaved && <Saved {...data} />}
            {showPhotos && <Photos photos={photos} userData={userData} />}
          </div>
        </div>
        {showStatus && <StatusModal />}
      </>
    )
  )
}

export default Profile
