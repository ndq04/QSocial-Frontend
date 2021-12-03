import {useContext} from 'react'
import ContentProfile from '../components/ContentProfile'
import Modal from '../components/StatusModal'
import {StatusContext} from '../contexts/StatusContext'

function Profile() {
  const {isOpenModal} = useContext(StatusContext)
  return (
    <>
      <div className='bg-[#f0f2f5] select-none pt-[60px]'>
        <ContentProfile />
      </div>
      {isOpenModal && <Modal />}
    </>
  )
}

export default Profile
