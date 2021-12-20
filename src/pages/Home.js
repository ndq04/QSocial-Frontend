import {useContext} from 'react'
import Content from '../components/home/post/Content'
import StatusModal from '../components/home/post/StatusModal'
import Rightbar from '../components/home/Rightbar'
import Sidebar from '../components/home/Sidebar'
import {AccountContext} from '../contexts/AccountContext'
import {StatusContext} from '../contexts/StatusContext'

function Home() {
  const {showStatus} = useContext(StatusContext)
  const {handleClose} = useContext(AccountContext)
  return (
    <>
      <div
        className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5 bg-[#f0f2f5] 
        select-none sm:px-10 lg:px-5 h-[calc(100vh-45px)] sm:h-[calc(100vh-60px)] 
        mt-[45px] sm:mt-[60px] dark:bg-[#18191a]'
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
