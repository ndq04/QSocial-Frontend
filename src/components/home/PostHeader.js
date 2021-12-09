import {useState, useContext} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {ACTION_TYPES} from '../../redux/actions/actionTypes'
import {StatusContext} from './../../contexts/StatusContext'

function PostHeader({pos, index}) {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggleDrop = () => setIsOpen(!isOpen)
  const {toggleStatusModal} = useContext(StatusContext)

  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleEdit = (edit) => {
    dispatch({
      type: ACTION_TYPES.STATUS,
      payload: {
        ...pos,
        edit: true,
      },
    })
    setIsOpen(false)
    toggleStatusModal()
  }

  return (
    <div className='post-header flex items-center justify-between p-3'>
      <div className='post-heading--left flex items-center'>
        <Link to={`/profile/${pos.user._id}`}>
          <img
            src={pos.user.avatar}
            alt={pos.user.firstname}
            className='w-11 h-11 object-cover rounded-full mr-2'
          />
        </Link>
        <div>
          <p>
            {pos.user.firstname} {pos.user.lastname}
          </p>
          <div className='flex text-gray-500 text-[13px] font-semibold'>
            <span>{moment(pos.createdAt).fromNow()}</span>
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

      <div className='w-[60%] post-heading--right relative cursor-pointer flex justify-end z-10'>
        <div
          className='w-10 h-10 rounded-full hover:bg-gray-100 flex'
          onClick={handleToggleDrop}
        >
          {!isOpen && auth.user._id === pos.user._id && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-600 m-auto'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z'
                clipRule='evenodd'
              />
            </svg>
          )}
          {isOpen && auth.user._id === pos.user._id && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-600 m-auto'
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
          {!isOpen && auth.user._id !== pos.user._id && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-600 m-auto'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z'
                clipRule='evenodd'
              />
            </svg>
          )}
          {isOpen && auth.user._id !== pos.user._id && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-600 m-auto'
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
        </div>
        {isOpen && (
          <ul className='absolute bg-white rounded-md border-t-[2px] shadow-lg w-full top-[110%] p-2'>
            {auth?.user._id === pos.user._id ? (
              <>
                <li
                  className='p-2 hover:bg-blue-500 font-semibold hover:text-white text-gray-700 rounded-md flex items-center'
                  onClick={() => handleEdit(pos)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                  </svg>
                  Sửa bài viết
                </li>
                <li className='p-2 hover:bg-red-500 font-semibold hover:text-white text-gray-700 rounded-md flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Xóa bài viết
                </li>
                <li className='p-2 hover:bg-green-500 font-semibold hover:text-white text-gray-700 rounded-md flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Copy bài viết
                </li>
              </>
            ) : (
              <>
                <li className='p-2 hover:bg-green-500 font-semibold hover:text-white text-gray-700 rounded-md flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Copy bài viết
                </li>
                <li className='p-2 hover:bg-purple-500 font-semibold hover:text-white text-gray-700 rounded-md flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z' />
                  </svg>
                  Lưu bài viết
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PostHeader
