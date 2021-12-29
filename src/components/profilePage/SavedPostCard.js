import moment from 'moment'
import {useContext, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {ProfileContext} from '../../contexts/ProfileContext'

function SavedPostCard({savedPosts}) {
  const [readMore, setReadMore] = useState(false)
  const {handleToggle} = useContext(ProfileContext)
  const {auth} = useSelector((state) => state)
  return (
    <>
      <h3 className='text-xl font-bold flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 sm:cursor-pointer text-[#fe2c55]'
          viewBox='0 0 20 20'
          fill='currentColor'
          onClick={() => handleToggle('showAccount')}
        >
          <path
            fillRule='evenodd'
            d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
            clipRule='evenodd'
          />
        </svg>
        <span className='mx-2 text-[#fe2c55]'>Bài viết đã lưu</span>
        <span className='text-red-500'>{savedPosts.length}</span>
      </h3>

      {savedPosts.map((savedpost) => (
        <div
          key={savedpost._id}
          className='bg-white rounded-lg my-4 p-4 dark:bg-[#282928]'
        >
          <div className='flex'>
            {savedpost.images.length > 0 && (
              <img
                src={savedpost.images[0].secure_url}
                alt=''
                className='w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] object-cover rounded-lg flex-shrink-0'
              />
            )}

            <div className='col-span-4 ml-4'>
              <h3 className='sm:text-lg dark:text-gray-300'>
                {savedpost.content.length < 70
                  ? savedpost.content
                  : readMore
                  ? savedpost.content
                  : savedpost.content.slice(0, 70)}
                <span>
                  {savedpost.content.length > 70 && (
                    <span
                      className='font-semibold cursor-pointer hover:underline dark:text-gray-500'
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? ' Ẩn bớt' : '... Xem thêm'}
                    </span>
                  )}
                </span>
              </h3>
              <div className='flex items-center my-2'>
                <Link
                  to={`/profile/${savedpost.user._id}`}
                  className='flex-shrink-0'
                >
                  <img
                    src={savedpost.user.avatar}
                    alt=''
                    className='w-10 h-10 object-cover rounded-full mr-2'
                    onClick={() => handleToggle('showAccount')}
                  />
                </Link>
                <Link
                  to={`/post/${savedpost._id}`}
                  className='sm:cursor-pointer sm:hover:underline text-gray-500 text-sm sm:text-base dark:text-gray-300'
                >
                  <span>Đã lưu từ bài viết của</span>
                  {auth.user._id === savedpost.user._id ? (
                    <span className='ml-1 font-semibold text-[#fe2c55]'>
                      <span>Bạn</span>
                    </span>
                  ) : (
                    <span className='ml-1 font-semibold text-[#fe2c55]'>
                      <span className='mr-1'>{savedpost.user.firstname}</span>
                      <span>{savedpost.user.lastname}</span>
                    </span>
                  )}
                </Link>
              </div>
              <div className='text-gray-500 hidden sm:block dark:text-gray-300'>
                <p>
                  Ngày đăng
                  <span className='text-gray-700 font-semibold ml-1 dark:text-gray-500'>
                    {moment(savedpost.createdAt).format('DD/MM/YYYY')}
                  </span>
                </p>
              </div>
              <p className='text-gray-500 my-2 sm:flex items-center hidden dark:text-gray-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-blue-500 mr-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z' />
                </svg>
                <span className='font-semibold text-gray-700 mr-1 dark:text-gray-500'>
                  {savedpost.likes.length}
                </span>
                <span>lượt thích</span>
              </p>
              <p className='text-gray-500 sm:flex items-center hidden dark:text-gray-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-blue-500 mr-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z' />
                  <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z' />
                </svg>
                <span className='font-semibold text-gray-700 mr-1 dark:text-gray-500'>
                  {savedpost.comments.length}
                </span>
                <span>bình luận</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default SavedPostCard
