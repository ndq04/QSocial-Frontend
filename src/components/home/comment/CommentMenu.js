import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {deleteComment} from '../../../redux/actions/commentActions'

function CommentMenu({setOnEdit, comment, pos, auth}) {
  const [menuItem, setMenuItem] = useState(false)
  const dispatch = useDispatch()
  const {socket} = useSelector((state) => state)

  const handleEdit = () => {
    setOnEdit(true)
  }
  const handleRemove = () => {
    dispatch(deleteComment({comment, pos, auth, socket}))
  }
  return (
    <div
      className='comment-menu hover:bg-[#f0f2f5] cursor-pointer p-2 rounded-full dark:hover:bg-[#3a3b3c]
     text-gray-500 ml-1 relative z-10 flex-shrink-0'
      onClick={() => setMenuItem(!menuItem)}
    >
      {!menuItem && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 dark:text-gray-300'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
        </svg>
      )}
      {menuItem && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 dark:text-gray-300'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      )}
      {menuItem && (
        <ul className='absolute w-[200px] right-0 top-[150%] p-2 bg-white shadow-lg rounded-md border dark:bg-[#3a3b3c] dark:border-gray-600'>
          <li
            className='p-2 hover:bg-blue-500 font-semibold hover:text-white 
          text-gray-700 rounded-md flex items-center'
            onClick={handleEdit}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-1 dark:text-gray-300'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
            </svg>
            <span className='dark:text-gray-300'>Chỉnh sửa</span>
          </li>
          <li
            className='p-2 hover:bg-red-500 font-semibold hover:text-white 
        text-gray-700 rounded-md flex items-center'
            onClick={handleRemove}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-1 dark:text-gray-300'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            <span className='dark:text-gray-300'>Xóa bình luận</span>
          </li>
        </ul>
      )}
    </div>
  )
}

export default CommentMenu
