import {useSelector} from 'react-redux'
import Post from './Post'

function Posts() {
  const {homePost} = useSelector((state) => state)
  return (
    <div>
      {homePost &&
        homePost.post.length > 0 &&
        homePost.post.map((pos, index) => (
          <Post key={pos._id} pos={pos} index={index} />
        ))}
    </div>
  )
}

export default Posts
