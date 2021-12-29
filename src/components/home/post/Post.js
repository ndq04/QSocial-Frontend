import {useState} from 'react'
import Comment from '../comment/Comment'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

function Post({pos, index}) {
  const [showComment, setShowComment] = useState(false)
  return (
    <div className='post w-[100%] mx-auto bg-white shadow-sm sm:rounded-xl mb-4 dark:bg-[#282928] sm:border sm:border-[#fe2c55] dark:border-none'>
      <PostHeader pos={pos} index={index} />
      <PostBody pos={pos} />
      <PostFooter pos={pos} setShowComment={setShowComment} />
      {showComment && <Comment pos={pos} setShowComment={setShowComment} />}
    </div>
  )
}

export default Post
