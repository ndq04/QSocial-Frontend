import {createContext, useState} from 'react'

export const ProfileContext = createContext()

function ProfileContextProvider({children}) {
  const [showAccount, setShowAccount] = useState(true)
  const [showFriends, setShowFriends] = useState(false)
  const [showFollowings, setShowFollowings] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [showPhotos, setShowPhotos] = useState(false)

  const handleToggle = (value) => {
    switch (value) {
      case 'showAccount':
        setShowAccount(true)
        setShowFriends(false)
        setShowFollowings(false)
        setShowSaved(false)
        setShowPhotos(false)
        break
      case 'showFriends':
        setShowAccount(false)
        setShowFriends(true)
        setShowFollowings(false)
        setShowSaved(false)
        setShowPhotos(false)
        break
      case 'showFollowings':
        setShowAccount(false)
        setShowFriends(false)
        setShowFollowings(true)
        setShowSaved(false)
        setShowPhotos(false)
        break
      case 'showSaved':
        setShowAccount(false)
        setShowFriends(false)
        setShowFollowings(false)
        setShowSaved(true)
        setShowPhotos(false)
        break
      default:
        setShowAccount(false)
        setShowFriends(false)
        setShowFollowings(false)
        setShowSaved(false)
        setShowPhotos(true)
        break
    }
  }

  const dataProfile = {
    showAccount,
    showFriends,
    showFollowings,
    showSaved,
    showPhotos,
    handleToggle,
  }

  return (
    <ProfileContext.Provider value={dataProfile}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
