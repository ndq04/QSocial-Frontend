import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Picker from 'emoji-picker-react'
import LikeComment from './LikeComment'
import CommentMenu from './CommentMenu'
import {updateComment} from '../../../redux/actions/commentActions'

function PostCommentItem({comment, pos}) {
  const [content, setContent] = useState('')
  const [readMore, setReadMore] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  const onEmojiClick = (e, emojiObject) => {
    setContent((prevInput) => prevInput + emojiObject.emoji)
    // setShowPicker(false)
  }

  const handleLike = async () => {
    setIsLike(true)
    // dispatch(likepost({pos, auth}))
  }
  const handleUnLike = async () => {
    setIsLike(false)
    // dispatch(unlikepost({pos, auth}))
  }
  const handleUpdateComment = () => {
    if (comment.content === content) {
      setOnEdit(false)
    } else {
      dispatch(updateComment({comment, content, pos, auth}))
      setOnEdit(false)
    }
  }
  const likeData = {isLike, handleLike, handleUnLike}

  useEffect(() => {
    setContent(comment.content)
  }, [comment.content])

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
                ? 'flex-1 rounded-xl bg-green-500 h-[200px]'
                : 'rounded-3xl bg-[#f0f2f5]'
            }`}
          >
            <div className='font-semibold text-sm text-gray-800 hover:underline'>
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
                  {content.length < 150
                    ? content
                    : readMore
                    ? content
                    : content.slice(0, 150)}

                  {content.length > 150 && (
                    <span
                      className='font-semibold cursor-pointer hover:underline'
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? ' Ẩn bớt' : '... Xem thêm'}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          {comment.likes.length > 0 && !onEdit && (
            <div
              className='flex items-center right-[-5%] bottom-[-10%] p-1 
            bg-white rounded-full shadow-lg flex-shrink-0 ml-1'
            >
              <img
                src='https://res.cloudinary.com/doltvro6d/image/upload/v1638971144/qsocial/thich_vjy4ss.png'
                alt='icon'
                className='w-5 h-5'
              />
              <span className='text-sm text-gray-500 font-semibold px-1'>
                {comment.likes.length}
              </span>
            </div>
          )}
          {comment.user._id === auth.user._id && !onEdit && (
            <CommentMenu setOnEdit={setOnEdit} />
          )}
        </div>

        <div className='comment-right--bottom'>
          {onEdit ? (
            <>
              <small
                className='hover:underline cursor-pointer font-bold text-gray-500 hover:text-green-600 pr-2'
                onClick={handleUpdateComment}
              >
                Cập nhật
              </small>
              <small
                className='hover:underline cursor-pointer font-bold text-gray-500 hover:text-red-500 pr-2'
                onClick={() => setOnEdit(false)}
              >
                Hủy bỏ
              </small>
            </>
          ) : (
            <>
              <LikeComment likeData={likeData} />
              <small className='hover:underline cursor-pointer font-bold text-gray-500 pr-2'>
                Phản hồi
              </small>
              <small className='text-gray-600'>
                {moment(comment.createdAt).fromNow()}
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCommentItem
