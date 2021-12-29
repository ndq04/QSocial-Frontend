import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
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
  // const {showUserLike, handleToggleUserLike} = useContext(PostContext)
  const [showUserLike, setShowUserLike] = useState(false)

  const dispatch = useDispatch(0)
  const {auth, socket} = useSelector((state) => state)

  useEffect(() => {
    if (pos.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true)
    }
  }, [pos.likes, auth.user._id])
  useEffect(() => {
    if (auth.user.saved.find((id) => id === pos._id)) {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [auth.user.saved, pos._id])

  const handleLike = () => {
    setIsLike(true)
    dispatch(likepost({pos, auth, socket}))
  }
  const handleUnLike = () => {
    setIsLike(false)
    dispatch(unlikepost({pos, auth, socket}))
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
      <div className='post-footer--top flex items-center justify-between relative'>
        <div className='flex items-center'>
          <img
            src='https://res.cloudinary.com/doltvro6d/image/upload/v1638971144/qsocial/tim_cli82p.png'
            alt='like'
            className='w-5 h-5 md:hover:cursor-pointer'
            onMouseOver={() => setShowUserLike(true)}
            onMouseOut={() => setShowUserLike(false)}
          />

          <div className='text-gray-600 text-[15px] ml-1 dark:text-gray-300 flex-1'>
            <p
              className='md:hover:underline md:hover:cursor-pointer text-sm'
              onMouseOver={() => setShowUserLike(true)}
              onMouseOut={() => setShowUserLike(false)}
            >
              <span>{pos.likes?.length}</span>
            </p>
            {showUserLike && (
              <div
                className='absolute w-[35%] bg-black opacity-70 p-2 rounded-lg shadow-lg border dark:border-gray-600
                top-[120%] left-0 z-20 dark:bg-white dark:opacity-90'
              >
                {pos.likes?.length > 0 &&
                  pos.likes.map((like, i) => (
                    <div key={i} className='rounded-md'>
                      <p className='text-sm text-gray-300 dark:text-black'>
                        {auth.user._id === like._id ? (
                          <span>Bạn</span>
                        ) : (
                          <span>
                            {like.firstname} {like.lastname}
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <p className='text-gray-600 text-sm ml-2 dark:text-gray-300'>
          <span>{pos.comments?.length}</span>
          <span> bình luận</span>
        </p>
      </div>

      <div className='post-footer--bottom grid grid-cols-3 text-sm border-t border-[#fe2c55] dark:border-gray-600 mt-3 py-1'>
        <LikePost {...likeData} />

        <div
          className='comment-post flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 py-1.5 
            rounded-md transition-colors duration-200 dark:hover:bg-[#414345]'
          onClick={() => setShowComment(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 dark:text-gray-300'
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
          <span className='font-semibold ml-2 dark:text-gray-300'>
            Bình luận
          </span>
        </div>

        <SavePost {...saveData} />
      </div>
    </div>
  )
}

export default PostFooter
