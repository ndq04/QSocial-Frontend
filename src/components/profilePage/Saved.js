import {useEffect, useState} from 'react'
import {getDataApi} from './../../utils/fetchDataApi'
import SavedPostCard from './SavedPostCard'

function Saved({auth}) {
  const [savedPosts, setSavedPosts] = useState([])
  useEffect(() => {
    getDataApi('savedposts', auth.token).then((res) =>
      setSavedPosts(res.data.savedPost)
    )
  }, [auth.token])
  return (
    <div className='max-w-6xl m-auto p-4 rounded-lg'>
      <SavedPostCard savedPosts={savedPosts} />
    </div>
  )
}

export default Saved
