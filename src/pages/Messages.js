import LeftSideMessage from '../components/messages/LeftSideMessage'
import RightSideMessage from '../components/messages/RightSideMessage'

function Messages() {
  return (
    <div className='mt-[45px] sm:mt-[60px] grid grid-cols-4 h-[calc(100vh-45px)] sm:h-[calc(100vh-60px)] select-none dark:bg-[#18191a]'>
      <LeftSideMessage />
      <RightSideMessage />
    </div>
  )
}

export default Messages
