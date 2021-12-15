import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import Post from '../components/home/post/Post'
import {getSinglePost} from '../redux/actions/postActions'

function SinglePost() {
  const [post, setPost] = useState([])
  const {auth, detailPost} = useSelector((state) => state)
  const {id} = useParams()
  const dispatch = useDispatch()

  const history = useHistory()

  useEffect(() => {
    dispatch(getSinglePost({detailPost, auth, id}))
    if (detailPost.length > 0) {
      const newPost = detailPost.filter((item) => item._id === id)
      setPost(newPost)
    }
  }, [dispatch, auth, id, detailPost])

  return (
    <div className='pt-[60px] bg-[#f0f2f5] min-h-screen'>
      <div className='max-w-[590px] m-auto'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 sm:cursor-pointer my-4'
          viewBox='0 0 20 20'
          fill='currentColor'
          onClick={() => history.goBack()}
        >
          <path
            fillRule='evenodd'
            d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
            clipRule='evenodd'
          />
        </svg>
        {post &&
          post.length > 0 &&
          post.map((pos, index) => (
            <Post key={pos._id} pos={pos} index={index} />
          ))}
      </div>
    </div>
  )
}

export default SinglePost
