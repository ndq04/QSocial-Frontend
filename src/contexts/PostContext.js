import {createContext, useState} from 'react'

export const PostContext = createContext()

function PostContextProvider({children}) {
  const [showUserLike, setShowUserLike] = useState(false)
  const handleToggleUserLike = () => setShowUserLike(!showUserLike)
  const handleCloseUserLike = () => {
    if (showUserLike === true) {
      setShowUserLike(false)
    }
  }
  const data = {
    showUserLike,
    handleToggleUserLike,
    handleCloseUserLike,
  }
  return <PostContext.Provider value={data}>{children}</PostContext.Provider>
}

export default PostContextProvider
