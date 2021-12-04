import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import ProfileStatusModal from '../components/profile/ProfileStatusModal'
import {useContext} from 'react'
import {StatusContext} from '../contexts/StatusContext'
import Info from '../components/profile/Info'
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

  const data = {userData, profile, auth, id}
  return (
    userData && (
      <>
        <div className='bg-[#f0f2f5] select-none pt-[60px]'>
          <div className='profile h-[calc(100vh-60px)] overflow-y-scroll'>
            <Info {...data} />
            <ProfileBody {...data} />
          </div>
        </div>
        {isOpenModal && <ProfileStatusModal {...data} />}
      </>
    )
  )
}

export default Profile
