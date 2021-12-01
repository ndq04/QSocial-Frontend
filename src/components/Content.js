import {useState, useEffect} from 'react'
import axios from 'axios'
import Post from './Post'
import Status from './Status'

function Content({handleToggle}) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        'posts/timeline/61a1056122a053f9e2e0219f'
      )
      setPosts(res.data)
    }
    fetchPosts()
  }, [])

  return (
    <div className='content col-span-2 h-[calc(100vh-60px)] py-4 overflow-y-scroll'>
      <Status handleToggle={handleToggle} />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Content
