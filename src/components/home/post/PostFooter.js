import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Like} from '../../../data/Like'
import {likepost, unlikepost} from '../../../redux/actions/postActions'
import LikePost from './LikePost'

function PostFooter({pos, setShowComment}) {
  const [isLike, setIsLike] = useState(false)

  const dispatch = useDispatch(0)
  const {auth} = useSelector((state) => state)

  useEffect(() => {
    if (pos.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true)
    }
  }, [pos.likes, auth.user._id])

  const handleLike = () => {
    setIsLike(true)
    dispatch(likepost({pos, auth}))
  }
  const handleUnLike = () => {
    setIsLike(false)
    dispatch(unlikepost({pos, auth}))
  }
  const likeData = {isLike, handleLike, handleUnLike}
  return (
    <div className='post-footer px-3 pt-3'>
      <div className='post-footer--top flex items-center justify-between border-gray-300'>
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

      <div className='post-footer--bottom grid grid-cols-3 text-sm border-t border-gray-300 mt-3 py-1'>
        <LikePost likeData={likeData} />

        <div
          className='comment-post flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 py-1.5 
            rounded-md transition-colors duration-200'
          onClick={() => setShowComment(true)}
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

        <div
          className='save-post flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 py-1.5
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
