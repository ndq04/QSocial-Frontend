import Picker from 'emoji-picker-react'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  likeComment,
  unLikeComment,
  updateComment,
} from '../../../redux/actions/commentActions'
import CommentInput from './CommentInput'
import CommentMenu from './CommentMenu'
import LikeComment from './LikeComment'

function PostCommentItem({comment, pos, commentId, children}) {
  const [content, setContent] = useState('')
  const [readMore, setReadMore] = useState(false)
  const [isLike, setIsLike] = useState(false)
  // const [load, setLoad] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [onReply, setOnReply] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()
  const onEmojiClick = (e, emojiObject) => {
    setContent((prevInput) => prevInput + emojiObject.emoji)
    // setShowPicker(false)
  }
  useEffect(() => {
    setContent(comment.content)
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true)
    }
  }, [comment.content, comment.likes, auth.user._id])

  const handleLike = () => {
    // if (load) return
    setIsLike(true)
    // setLoad(true)
    dispatch(likeComment({comment, pos, auth}))
    // setLoad(false)
  }
  const handleUnLike = () => {
    // if (load) return
    setIsLike(false)
    // setLoad(true)
    dispatch(unLikeComment({comment, pos, auth}))
    // setLoad(false)
  }

  const handleReply = () => {
    if (onReply) return setOnReply(false)
    setOnReply({...comment, commentId})
  }

  const likeData = {isLike, handleLike, handleUnLike}

  const handleUpdateComment = () => {
    if (comment.content === content) {
      setOnEdit(false)
    } else {
      dispatch(updateComment({comment, content, pos, auth}))
      setOnEdit(false)
    }
  }

  const commentData = {setOnEdit, comment, pos, auth}

  return (
    <div className='flex items-start mb-3'>
      <Link
        to={`/profile/${comment.user._id}`}
        className='comment-left flex-shrink-0'
      >
        <img
          src={comment.user.avatar}
          alt='avatar'
          className='w-9 h-9 rounded-full object-cover mr-2'
        />
      </Link>
      <div className='comment-right flex-1'>
        <div className='comment-right--top flex items-center'>
          <div
            className={`px-3 pt-2 pb-3 relative ${
              onEdit
                ? 'flex-1 rounded-xl bg-green-500 h-[200px] dark:bg-[#3a3b3c]'
                : 'rounded-3xl bg-[#f0f2f5] dark:bg-[#3a3b3c]'
            }`}
          >
            <div className='font-semibold text-sm text-[#fe2c55] hover:underline dark:text-gray-300'>
              <Link
                to={`/profile/${comment.user._id}`}
                className={`${onEdit && 'text-white'}`}
              >
                {comment.user.firstname} {comment.user.lastname}
              </Link>
            </div>
            <div className='text-[15px] w-full h-[90%] pt-2'>
              {onEdit ? (
                <div className='flex items-center h-full'>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='w-full h-full p-4 rounded-lg outline-none border-none resize-none'
                    onClick={() => setShowPicker(false)}
                  />
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7 cursor-pointer ml-1 text-white'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    onClick={() => setShowPicker(!showPicker)}
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {showPicker && (
                    <div className='absolute top-[100%] right-0 z-10'>
                      <Picker onEmojiClick={onEmojiClick} />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <p className='dark:text-gray-300'>
                    {comment?.tag && comment.tag._id !== comment.user._id && (
                      <Link
                        to={`/profile/${comment.tag._id}`}
                        className='sm:hover:border-b-2 sm:hover:border-blue-400 sm:dark:hover:border-blue-500'
                      >
                        <span className='text-sm font-semibold text-[#fe2c55]'>
                          @{comment.tag.firstname}
                          {comment.tag.lastname}{' '}
                        </span>
                      </Link>
                    )}
                    {content.length < 150
                      ? content
                      : readMore
                      ? content
                      : content.slice(0, 150)}

                    {content.length > 150 && (
                      <span
                        className='font-semibold cursor-pointer hover:underline dark:text-gray-400'
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? ' Ẩn bớt' : '... Xem thêm'}
                      </span>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
          {comment.likes.length > 0 && !onEdit ? (
            <div
              className='flex items-center right-[-5%] bottom-[-10%] p-1 
            bg-white rounded-full shadow-lg flex-shrink-0 ml-1'
            >
              <img
                src='https://res.cloudinary.com/quangnd/image/upload/v1638971144/qsocial/thich_vjy4ss.png'
                alt='icon'
                className='w-5 h-5'
              />
              <span className='text-sm text-gray-500 font-semibold px-1'>
                {comment.likes.length}
              </span>
            </div>
          ) : (
            ''
          )}
          {comment.user._id === auth.user._id && !onEdit && (
            <CommentMenu {...commentData} />
          )}
        </div>

        <div className='comment-right--bottom'>
          {onEdit ? (
            <>
              <small
                className='sm:hover:underline sm:cursor-pointer font-bold text-gray-500 sm:hover:text-green-600 pr-2 dark:text-gray-400 sm:dark:hover:text-green-500'
                onClick={handleUpdateComment}
              >
                Cập nhật
              </small>
              <small
                className='sm:hover:underline sm:cursor-pointer font-bold text-gray-500 sm:hover:text-red-500 pr-2 dark:text-gray-400 sm:dark:hover:text-red-400'
                onClick={() => setOnEdit(false)}
              >
                Hủy bỏ
              </small>
            </>
          ) : (
            <>
              <LikeComment likeData={likeData} />
              <small
                className='sm:hover:underline sm:cursor-pointer font-bold text-gray-500 pr-2 dark:text-gray-400'
                onClick={handleReply}
              >
                {onReply ? 'Hủy bỏ' : 'Phản hồi'}
              </small>
              <small className='text-gray-600 dark:text-gray-500'>
                {moment(comment.createdAt).fromNow()}
              </small>
            </>
          )}
          {onReply && (
            <CommentInput
              pos={pos}
              comment={comment}
              onReply={onReply}
              setOnReply={setOnReply}
            >
              <Link
                to={`/profile/${onReply.user._id}`}
                className='mr-2 text-sm font-semibold dark:text-gray-300'
              >
                @{onReply.user.firstname}
                {onReply.user.lastname}
              </Link>
            </CommentInput>
          )}
          <div className='m-1'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default PostCommentItem
