import {useState} from 'react'
import {useSelector} from 'react-redux'
import GlobalBtnFriend from '../profile/GlobalBtnFriend'

function GlobalCard({user}) {
  const [showInfo, setShowInfo] = useState(true)
  const [showInfoAbout, setShowInfoAbout] = useState(false)

  const {auth} = useSelector((state) => state)

  const toggleShowInfo = (value) => {
    if (value === 'showInfo') {
      setShowInfo(true)
      setShowInfoAbout(false)
    } else if (value === 'showInfoAbout') {
      setShowInfo(false)
      setShowInfoAbout(true)
    }
  }
  const getGender = (value) => {
    switch (value) {
      case 'male':
        return 'Nam'
      default:
        return 'Nữ'
    }
  }
  return (
    <div className='relative w-full h-[400px] shadow-md rounded-md border-gray-300 overflow-hidden mt-5'>
      <div className='card-head relative w-full h-[150px]'>
        <img
          src={user.coverimage}
          alt='coverimage'
          className='w-full h-full object-cover'
        />
        <img
          src={user.avatar}
          alt='avatar'
          className='absolute w-24 h-24 rounded-full object-cover
          bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 '
        />
      </div>
      <div className='card-body pt-[3rem] group'>
        <div
          className={`relative text-xl font-bold ${
            user.gender === 'female' ? 'text-red-700' : 'text-blue-700'
          }  text-center my-2`}
        >
          <h3>
            {user.firstname} {user.lastname}
          </h3>
          {showInfo && (
            <div
              className='p-1 bg-gray-200 hover:bg-gray-300 
              absolute right-1 top-0 rounded-full cursor-pointer hidden group-hover:block'
              onClick={() => toggleShowInfo('showInfoAbout')}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 '
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          )}
          {showInfoAbout && (
            <div
              className='p-1 bg-gray-200 hover:bg-gray-300 
              absolute left-1 top-0 rounded-full cursor-pointer hidden group-hover:block'
              onClick={() => toggleShowInfo('showInfo')}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          )}
        </div>

        {showInfo && (
          <div className='flex flex-col items-center mt-8'>
            <div className='flex items-center text-gray-500 font-medium'>
              <p>Người theo dõi</p>
              <p className='font-bold text-gray-800 ml-2 text-lg'>
                {user.friends.length}
              </p>
            </div>
            <div className='flex items-center text-gray-500 font-medium'>
              <p>Đang theo dõi</p>
              <p className='font-bold text-gray-800 ml-2 text-lg'>
                {user.followings.length}
              </p>
            </div>
            <div className='mt-5'>
              {auth.user._id !== user._id && (
                <GlobalBtnFriend user={user} follow />
              )}
            </div>
          </div>
        )}
        {showInfoAbout && (
          <div className='px-4'>
            <p className='text-gray-500 font-medium py-1'>
              <span>Sống tại</span>
              <span className='ml-2 text-black font-semibold'>
                {user.livein || 'Đang cập nhật'}
              </span>
            </p>
            <p className='text-gray-500 font-medium py-1'>
              <span>Đến từ</span>
              <span className='ml-2 text-black font-semibold'>
                {user.from || 'Đang cập nhật'}
              </span>
            </p>
            <p className='text-gray-500 font-medium py-1'>
              <span>Nghề nghiệp</span>
              <span className='ml-2 text-black font-semibold'>
                {user.job || 'Đang cập nhật'}
              </span>
            </p>
            <p className='text-gray-500 font-medium py-1'>
              <span>Giới tính</span>
              <span className='ml-2 text-black font-semibold'>
                {getGender(user.gender)}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GlobalCard
