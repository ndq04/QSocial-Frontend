import {useContext} from 'react'
import EmptyConversation from '../components/messages/EmptyConversation'
import LeftSideMessage from '../components/messages/LeftSideMessage'
import {AccountContext} from './../contexts/AccountContext'
import {NotifyContext} from './../contexts/NotifyContext'

function Messages() {
  const {handleClose} = useContext(AccountContext)
  const {handleCloseNotify} = useContext(NotifyContext)
  return (
    <div
      className='mt-[45px] sm:mt-[60px] flex flex-col lg:grid lg:grid-cols-4 h-[calc(100vh-45px)] sm:h-[calc(100vh-60px)] select-none dark:bg-[#18191a]'
      onClick={() => {
        handleClose()
        handleCloseNotify()
      }}
    >
      <LeftSideMessage />
      <EmptyConversation />
    </div>
  )
}

export default Messages
