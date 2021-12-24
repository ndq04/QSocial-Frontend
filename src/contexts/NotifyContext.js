import {createContext, useState} from 'react'

export const NotifyContext = createContext()

function NotifyContextProvider({children}) {
  const [showNotify, setShowNotify] = useState(false)
  const handleToggleNotify = () => setShowNotify(!showNotify)
  const handleCloseNotify = () => {
    if (showNotify === true) {
      setShowNotify(false)
    }
  }
  const data = {
    showNotify,
    handleToggleNotify,
    handleCloseNotify,
  }
  return (
    <NotifyContext.Provider value={data}>{children}</NotifyContext.Provider>
  )
}

export default NotifyContextProvider
