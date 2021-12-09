import {createContext} from 'react'
import {useState} from 'react'

export const StatusContext = createContext()

const StatusContextProvider = ({children}) => {
  const [showStatus, setShowStatus] = useState(false)
  const toggleStatusModal = () => setShowStatus(!showStatus)

  const data = {
    showStatus,
    toggleStatusModal,
  }
  return (
    <StatusContext.Provider value={data}>{children}</StatusContext.Provider>
  )
}

export default StatusContextProvider
