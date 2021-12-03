import {createContext} from 'react'
import {useState} from 'react'

export const AccountContext = createContext()

const AccountContextProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen(!isOpen)
  const handleClose = () => {
    if (isOpen === true) {
      setIsOpen(false)
    }
  }

  const data = {
    isOpen,
    handleToggle,
    handleClose,
  }
  return (
    <AccountContext.Provider value={data}>{children}</AccountContext.Provider>
  )
}

export default AccountContextProvider
