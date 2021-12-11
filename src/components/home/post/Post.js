import {useState} from 'react'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import Comment from '../comment/Comment'

function Post({pos, index}) {
  const [showComment, setShowComment] = useState(false)
  return (
    <div className='post w-[100%] mx-auto my-5 bg-white shadow-sm rounded-xl'>
      <PostHeader pos={pos} index={index} />
      <PostBody pos={pos} />
      <PostFooter pos={pos} setShowComment={setShowComment} />
      {showComment && <Comment pos={pos} setShowComment={setShowComment} />}
    </div>
  )
}

export default Post
