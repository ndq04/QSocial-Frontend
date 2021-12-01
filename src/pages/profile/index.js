import {useContext} from 'react'
import ContentProfile from '../../components/ContentProfile'
import Navbar from '../../components/Navbar'
import Modal from '../../components/StatusModal'
import {StatusContext} from '../../contexts/StatusContext'
import {useParams} from 'react-router-dom'

function Profile() {
  const {username} = useParams()
  const {isOpenModal} = useContext(StatusContext)
  return (
    <>
      <Navbar />
      <div className='bg-[#f0f2f5] select-none pt-[60px]'>
        <ContentProfile username={username} />
      </div>
      {isOpenModal && <Modal />}
    </>
  )
}

export default Profile
