import {useContext} from 'react'
import {AccountContext} from './../../contexts/AccountContext'
import {NotifyContext} from './../../contexts/NotifyContext'
import InfoUserMessage from './InfoUserMessage'
import LeftSideMessage from './LeftSideMessage'
import RightSideMessage from './RightSideMessage'

function ConversationAll() {
  const {handleClose} = useContext(AccountContext)
  const {handleCloseNotify} = useContext(NotifyContext)
  return (
    <div
      className='mt-[45px] sm:mt-[60px] grid grid-cols-4 h-[calc(100vh-45px)] sm:h-[calc(100vh-60px)] select-none dark:bg-[#18191a]'
      onClick={() => {
        handleClose()
        handleCloseNotify()
      }}
    >
      <LeftSideMessage />
      <RightSideMessage />
      <InfoUserMessage />
    </div>
  )
}

export default ConversationAll
