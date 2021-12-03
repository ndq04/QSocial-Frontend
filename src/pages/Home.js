import {useContext} from 'react'
import Content from '../components/Content'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'
import Modal from '../components/StatusModal'
import {AccountContext} from '../contexts/AccountContext'
import {StatusContext} from '../contexts/StatusContext'

function Home() {
  const {isOpenModal} = useContext(StatusContext)
  const {handleClose} = useContext(AccountContext)
  return (
    <>
      <div
        className='grid grid-cols-4 gap-5 bg-[#f0f2f5] select-none px-2 pt-[60px]'
        onClick={handleClose}
      >
        <Sidebar />
        <Content />
        <Rightbar />
      </div>
      {isOpenModal && <Modal />}
    </>
  )
}

export default Home
