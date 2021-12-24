import InfoUserMessage from './InfoUserMessage'
import LeftSideMessage from './LeftSideMessage'
import RightSideMessage from './RightSideMessage'

function Conversation() {
  return (
    <div className='mt-[45px] sm:mt-[60px] grid grid-cols-4 h-[calc(100vh-45px)] sm:h-[calc(100vh-60px)] select-none dark:bg-[#18191a]'>
      <LeftSideMessage />
      <RightSideMessage />
      <InfoUserMessage />
    </div>
  )
}

export default Conversation
