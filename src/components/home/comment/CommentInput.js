import Picker from 'emoji-picker-react'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createComment} from '../../../redux/actions/commentActions'

function CommentInput({pos, children, comment, onReply, setOnReply}) {
  const [content, setContent] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  const {auth, socket} = useSelector((state) => state)
  const dispatch = useDispatch()

  const onEmojiClick = (e, emojiObject) => {
    setContent((prevInput) => prevInput + emojiObject.emoji)
    // setShowPicker(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) {
      if (onReply) return setOnReply(false)
      return
    }
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    }
    dispatch(createComment({pos, comment: newComment, auth, socket}))
    if (onReply) return setOnReply(false)
    setContent('')
  }
  return (
    <div className='flex items-center py-3'>
      <img
        src={auth.user.avatar}
        alt='avatar'
        className='w-11 h-11 rounded-full object-cover flex-shrink-0 border-2 p-[2px] border-[#fe2c55] mr-2'
        onClick={() => setShowPicker(false)}
      />
      {children}
      <form
        className='flex-1 bg-[#f0f2f5] flex items-center px-4 rounded-full shadow-sm h-9 relative z-10 dark:bg-[#3a3b3c]'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Viết bình luận...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full outline-none border-none m-auto bg-transparent mr-3 dark:text-gray-300'
          onClick={() => setShowPicker(false)}
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7 cursor-pointer mr-1 text-yellow-500'
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
          <div className='absolute top-[110%] right-0 z-10'>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </form>
    </div>
  )
}

export default CommentInput
