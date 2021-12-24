import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteAllNotifies, readNotify} from '../redux/actions/notifyActions'
function Notification() {
  const {notify, auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  const isReadNotify = (nt) => {
    dispatch(readNotify({nt, auth}))
  }
  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false)
    if (newArr.length === 0) {
      dispatch(deleteAllNotifies(auth))
    }
    if (
      window.confirm(
        `Bạn có ${newArr.length} thông báo chưa đọc. Bạn có muốn tiếp tục ?`
      )
    ) {
      dispatch(deleteAllNotifies(auth))
    }
  }
  return (
    <div
      className='mt-[45px] sm:mt-[60px] h-[calc(100vh-45px)]
      sm:h-[calc(100vh-60px)] select-none bg-[#f0f2f5] dark:bg-[#18191a] overflow-y-scroll'
    >
      <div
        className='bg-white dark:bg-[#242526] min-h-screen md:border border-gray-300 md:shadow 
        md:rounded-lg p-3 w-full md:w-[590px] mt-0 md:mt-4 mx-auto dark:border-gray-500 md:dark:border-gray-700'
      >
        <h3 className='font-bold text-2xl dark:text-gray-300 mt-4 sm:mt-0'>
          Thông báo
        </h3>
        {notify.data?.length > 0 && (
          <p
            className='inline-block my-2 py-2 px-3 rounded-full text-gray-700 bg-[#f0f2f5] border 
          md:cursor-pointer font-semibold md:hover:bg-[#dbdde0] md:dark:bg-transparent dark:border-0 dark:text-red-500 md:dark:hover:bg-[#3a3b3c]'
            onClick={handleDeleteAll}
          >
            Xóa tất cả
          </p>
        )}
        {notify.data && notify.data.length > 0 ? (
          <ul className='mt-2'>
            {notify.data.map((nt, i) => (
              <li
                key={i}
                className='rounded-lg 
                md:hover:bg-[#f0f2f5] md:dark:hover:bg-[#3a3b3c] transition-colors duration-200 px-2 py-1 my-1'
              >
                <Link
                  to={`${nt.url}`}
                  className='flex items-center justify-between'
                  onClick={() => isReadNotify(nt)}
                >
                  <div className='relative'>
                    <img
                      src={nt.user.avatar}
                      alt='avatar'
                      className='w-14 h-14 object-cover rounded-full flex-shrink-0 border'
                    />
                    {nt.text === 'đã thích bài viết' && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-7 rounded-full translate-x-[25%] absolute bottom-0 right-0 text-white bg-blue-500 p-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z' />
                      </svg>
                    )}
                    {nt.text === 'đã bỏ thích bài viết' && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-7 rounded-full translate-x-[25%] absolute bottom-0 right-0 text-white bg-gray-400 dark:bg-gray-500 p-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z' />
                      </svg>
                    )}
                    {nt.text === 'đã bình luận bài viết' && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-7 rounded-full translate-x-[25%] absolute bottom-0 right-0 text-white bg-green-500 p-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z' />
                        <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z' />
                      </svg>
                    )}
                    {nt.text === 'đã nhắc đến bạn trong bình luận' && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-7 rounded-full translate-x-[25%] absolute bottom-0 right-0 text-white bg-green-500 p-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z' />
                        <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z' />
                      </svg>
                    )}
                    {nt.text === 'đã bắt đầu theo dõi bạn' && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-7 rounded-full translate-x-[25%] absolute bottom-0 right-0 text-white bg-blue-500 p-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                      </svg>
                    )}
                    {nt.text === 'đã bỏ theo dõi bạn' && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-7 rounded-full translate-x-[25%] absolute bottom-0 right-0 text-white bg-red-500 p-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z' />
                      </svg>
                    )}
                  </div>
                  <div className='flex-1 px-3'>
                    <p className='dark:text-white'>
                      <span className='font-semibold dark:text-gray-400'>
                        {nt.user.firstname} {nt.user.lastname}
                      </span>
                      <span className='mx-1 text-gray-800 dark:text-gray-300'>
                        {nt.text}
                      </span>
                      <span>{nt.content?.slice(0, 100)}</span>
                    </p>
                    <small
                      className={`font-medium ${
                        nt.isRead ? 'text-gray-500' : 'text-blue-500'
                      }`}
                    >
                      {moment(nt.createdAt).fromNow()}
                    </small>
                  </div>
                  {!nt.isRead && (
                    <span className='flex-shrink-0 w-3 h-3 rounded-full bg-blue-500'></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className='flex mt-36 text-lg font-semibold dark:text-gray-300'>
            <p className='m-auto'>Không có thông báo</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notification
