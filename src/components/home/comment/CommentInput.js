import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Picker from 'emoji-picker-react'
import {createComment} from '../../../redux/actions/commentActions'

function InputPostComment({pos}) {
  const [content, setContent] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  const onEmojiClick = (e, emojiObject) => {
    setContent((prevInput) => prevInput + emojiObject.emoji)
    // setShowPicker(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
    }
    dispatch(createComment({pos, comment: newComment, auth}))
    setContent('')
  }
  return (
    <div className='flex items-center py-3'>
      <img
        src={auth.user.avatar}
        alt='avatar'
        className='w-9 h-9 rounded-full object-cover flex-shrink-0 mr-3'
        onClick={() => setShowPicker(false)}
      />
      <form
        className='flex-1 bg-[#f0f2f5] flex items-center px-4 rounded-full shadow-sm h-9 relative z-20'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Viết bình luận...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full outline-none border-none m-auto bg-transparent mr-3'
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

export default InputPostComment
