import {useContext} from 'react'
import Content from '../components/home/post/Content'
import Rightbar from '../components/home/Rightbar'
import Sidebar from '../components/home/Sidebar'
import {AccountContext} from '../contexts/AccountContext'
import {StatusContext} from '../contexts/StatusContext'
import StatusModal from '../components/home/post/StatusModal'

function Home() {
  const {showStatus} = useContext(StatusContext)
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
      {showStatus && <StatusModal />}
    </>
  )
}

export default Home
