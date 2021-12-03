import {createContext} from 'react'
import {useState} from 'react'

export const StatusContext = createContext()

const StatusContextProvider = ({children}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const handleToggle = () => setIsOpenModal(!isOpenModal)

  const data = {
    isOpenModal,
    handleToggle,
  }
  return (
    <StatusContext.Provider value={data}>{children}</StatusContext.Provider>
  )
}

export default StatusContextProvider
