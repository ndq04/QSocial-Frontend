import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Like} from '../../../data/Like'
import {
  likepost,
  savedPost,
  unlikepost,
  unsavedPost,
} from '../../../redux/actions/postActions'
import LikePost from './LikePost'
import SavePost from './SavePost'

function PostFooter({pos, setShowComment}) {
  const [isLike, setIsLike] = useState(false)
  const [saved, setSaved] = useState(false)

  const dispatch = useDispatch(0)
  const {auth} = useSelector((state) => state)

  useEffect(() => {
    if (pos.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true)
    }
  }, [pos.likes, auth.user._id])

  useEffect(() => {
    if (auth.user.saved.find((id) => id === pos._id)) {
      setSaved(true)
    }
  }, [auth.user.saved, pos._id])

  const handleLike = () => {
    setIsLike(true)
    dispatch(likepost({pos, auth}))
  }
  const handleUnLike = () => {
    setIsLike(false)
    dispatch(unlikepost({pos, auth}))
  }

  const handleSaved = () => {
    setSaved(true)
    dispatch(savedPost({pos, auth}))
  }
  const handleUnSaved = () => {
    setSaved(false)
    dispatch(unsavedPost({pos, auth}))
  }

  const likeData = {isLike, handleLike, handleUnLike}
  const saveData = {saved, handleSaved, handleUnSaved}

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
        <LikePost {...likeData} />

        <div
          className='comment-post flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 py-1.5 
            rounded-md transition-colors duration-200'
          onClick={() => setShowComment(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
            />
          </svg>
          <span className='font-semibold ml-2'>Bình luận</span>
        </div>

        <SavePost {...saveData} />
      </div>
    </div>
  )
}

export default PostFooter
