import {useState} from 'react'
import {Link} from 'react-router-dom'
import {Like} from '../../data/Like'
import LikePost from './LikePost'

function PostFooter({pos}) {
  const [isLike, setIsLike] = useState(false)
  const handleLike = () => {}
  const handleUnLike = () => {}
  const likeData = {isLike, handleLike, handleUnLike}
  return (
    <div className='post-footer p-3'>
      <div className='flex items-center justify-between border-b pb-3 mb-3 border-gray-300'>
        <div className='flex items-center'>
          {Like.map((item) => (
            <img
              key={item.id}
              src={item.img}
              alt='*'
              className='w-5 h-5 mr-1'
            />
          ))}
          <p className='text-gray-600 text-[15px] ml-2'>
            {pos.likes.length} <span>người thích</span>
          </p>
        </div>
        <p className='text-gray-600 text-[15px] ml-2'>
          {pos.comments.length} <span>bình luận</span>
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <LikePost likeData={likeData} />
        <Link to={`/post/${pos._id}`}>
          <div
            className='flex items-center cursor-pointer text-gray-500 hover:bg-gray-200 py-2 px-10 
          rounded-md transition-colors duration-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z' />
              <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z' />
            </svg>
            <span className='font-semibold ml-2'>Bình luận</span>
          </div>
        </Link>
        <div
          className='flex items-center cursor-pointer text-gray-500 hover:bg-gray-200 py-2 px-10 
          rounded-md transition-colors duration-200'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z' />
          </svg>
          <span className='font-semibold ml-2'>Lưu</span>
        </div>
      </div>
    </div>
  )
}

export default PostFooter
