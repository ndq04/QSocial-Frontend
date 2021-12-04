import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import ProfileStatusModal from '../components/profile/ProfileStatusModal'
import {useContext} from 'react'
import {StatusContext} from '../contexts/StatusContext'
import ProfileHead from '../components/profile/ProfileHead'
import ProfileBody from '../components/profile/ProfileBody'
import {getProfileUsers} from '../redux/actions/profileActions'

function Profile() {
  const {isOpenModal} = useContext(StatusContext)
  const [userData, setUserData] = useState([])
  const {id} = useParams()
  const {auth, profile} = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      setUserData([auth.user])
    } else {
      dispatch(getProfileUsers({users: profile.users, id, auth}))
      const newData = profile.users.filter((user) => user._id === id)
      setUserData(newData)
    }
  }, [id, auth.user, auth, dispatch, profile.users])
  console.log(userData)
  return (
    userData && (
      <>
        <div className='bg-[#f0f2f5] select-none pt-[60px]'>
          <div className='profile h-[calc(100vh-60px)] overflow-y-scroll'>
            <ProfileHead userData={userData} />
            <ProfileBody userData={userData} />
          </div>
        </div>
        {isOpenModal && <ProfileStatusModal userData={userData} />}
      </>
    )
  )
}

export default Profile
