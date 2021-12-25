import {useContext} from 'react'
import {AccountContext} from './../../contexts/AccountContext'
import {NotifyContext} from './../../contexts/NotifyContext'
import InfoUserMessage from './InfoUserMessage'
import RightSideMessage from './RightSideMessage'

function Conversation() {
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
      <RightSideMessage messenger />
      <InfoUserMessage />
    </div>
  )
}

export default Conversation
