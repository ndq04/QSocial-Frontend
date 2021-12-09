import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

function Post({pos, index}) {
  return (
    <div className='post w-[100%] mx-auto my-5 bg-white shadow-sm rounded-xl'>
      <PostHeader pos={pos} index={index} />
      <PostBody pos={pos} />
      <PostFooter pos={pos} />
    </div>
  )
}

export default Post
