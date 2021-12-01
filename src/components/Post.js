import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import {Like} from '../data/Like'

function Post({post}) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})

  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  const handleLike = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `users?userId=${post.userId}`
      )
      setUser(res.data.user)
    }
    fetchUser()
  }, [post.userId])

  return (
    <div className='post w-[100%] mx-auto my-5 bg-white shadow-sm rounded-xl p-3'>
      <div className='post-heading flex items-center justify-between'>
        <div className='post-heading--left flex items-center'>
          <Link to={`profile/${user.username}`}>
            <img
              src={user.avatar || 'user.png'}
              alt='avatar'
              className='w-11 h-11 object-cover rounded-full mr-2'
            />
          </Link>
          <div>
            <p>{user.username}</p>
            <div className='flex text-gray-500 text-[13px] font-semibold'>
              <span>{format(post.createdAt)}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='post-heading--right cursor-pointer w-10 h-10 rounded-full hover:bg-gray-100 flex'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-gray-600 m-auto'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
          </svg>
        </div>
      </div>
      <div className='post-body my-3'>
        <p>{post.desc}</p>
        <img
          src={post.image}
          alt='img'
          className='w-full mt-3'
        />
      </div>
      <div className='post-footer'>
        <div className='flex items-center border-b pb-3 mb-3 border-gray-300'>
          {Like.map((item) => (
            <img
              key={item.id}
              src={PublicFolder + item.img}
              alt='*'
              className='w-5 h-5 mr-1'
            />
          ))}
          <p className='text-gray-600 text-sm'>
            {like} người thích
          </p>
        </div>
        <div className='flex'>
          <div
            className={`flex items-center cursor-pointer
         text-gray-500 hover:bg-gray-200 py-2 px-10 
          rounded-md transition-colors duration-200 ${
            isLiked && 'text-blue-600'
          }`}
            onClick={handleLike}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`h-6 w-6}`}
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z' />
            </svg>
            <span className='font-semibold ml-2'>
              Thích
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
