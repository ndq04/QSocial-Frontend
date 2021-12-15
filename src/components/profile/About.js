import {useContext} from 'react'
import {Link, useParams} from 'react-router-dom'
import {ProfileContext} from '../../contexts/ProfileContext'

function About({userData, auth, photos}) {
  const {id} = useParams()
  const {handleToggle} = useContext(ProfileContext)

  const getGender = (value) => {
    switch (value) {
      case 'male':
        return 'Nam'
      default:
        return 'Nữ'
    }
  }

  return (
    userData.length > 0 &&
    userData.map((user, i) => (
      <div key={i}>
        <div className='profile-info--intro md:rounded-lg p-3 bg-white shadow-lg'>
          <h3 className='font-bold text-xl'>Giới thiệu</h3>
          <div className='flex items-center py-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-gray-500 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
            </svg>
            <span className='mr-1'>Sống tại</span>
            <span className='font-semibold text-gray-900'>
              {user.livein || 'Đang cập nhật'}
            </span>
          </div>
          <div className='flex items-center pb-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-gray-500 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </svg>
            <span className='mr-1'>Đến từ</span>
            <span className='font-semibold text-gray-900'>
              {user.from || 'Đang cập nhật'}
            </span>
          </div>
          <div className='flex items-center pb-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-gray-500 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z' />
            </svg>
            <span className='mr-1'>Nghề nghiệp</span>
            <span className='font-semibold text-gray-900'>
              {user.job || 'Đang cập nhật'}
            </span>
          </div>
          <div className='flex items-center pb-3'>
            <span className='mr-1'>Giới tính</span>
            <span className='font-semibold text-gray-900'>
              {getGender(user.gender)}
            </span>
          </div>
          <div className='flex items-center pb-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-gray-500 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                clipRule='evenodd'
              />
            </svg>
            <span className='mr-1'>Đã tham gia</span>
            <span className='font-semibold text-gray-900'>
              {user.createdAt}
            </span>
          </div>
        </div>
        <div className='profile-info--followings md:rounded-lg p-3 bg-white mt-[1.5px] md:mt-4 md:shadow-lg'>
          <div className='my-3 flex items-center justify-between'>
            <h3 className='relative font-bold text-xl flex items-center'>
              Ảnh
              <span className='ml-2 flex w-6 h-6 bg-red-500 text-white rounded-full'>
                <span className='m-auto text-sm'>{photos.length + 1}</span>
              </span>
            </h3>
            <p
              className='py-1.5 px-4 hover:bg-gray-300 
                rounded-md cursor-pointer text-blue-600'
              onClick={() => handleToggle('showPhotos')}
            >
              Xem tất cả
            </p>
          </div>
          <div className='grid grid-cols-3 gap-x-3 gap-y-9 mt-4 h-[270px] sm:h-[480px] lg:h-[270px] overflow-y-scroll'>
            {photos &&
              photos.length > 0 &&
              photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo[0].secure_url}
                  alt=''
                  className='rounded-lg w-full h-[108px] sm:h-[200px] lg:h-[108px] object-cover'
                />
              ))}
            <img
              src={userData[0].avatar}
              alt=''
              className='rounded-lg w-full h-[108px] sm:h-[200px] lg:h-[108px] object-cover'
            />
          </div>
        </div>
        {auth && auth.user && id === auth.user._id && (
          <div className='profile-info--followings md:rounded-lg p-3 bg-white mt-[1.5px] md:mt-4 md:shadow-lg'>
            <div className='my-3 flex items-center justify-between'>
              <h3 className='relative font-bold text-xl flex items-center'>
                Đang theo dõi
                <span className='ml-2 flex w-6 h-6 bg-red-500 text-white rounded-full'>
                  <span className='m-auto text-sm'>
                    {user.followings.length}
                  </span>
                </span>
              </h3>
              <p
                className='py-1.5 px-4 hover:bg-gray-300 
                rounded-md cursor-pointer text-blue-600'
                onClick={() => handleToggle('showFollowings')}
              >
                Xem tất cả
              </p>
            </div>
            <div className='grid grid-cols-3 gap-x-3 gap-y-9 mt-4 h-[300px] sm:h-[480px] lg:h-[300px] overflow-y-scroll'>
              {user &&
                user.followings.length > 0 &&
                user.followings.map((follow, i) => (
                  <Link to={`/profile/${follow._id}`} key={i}>
                    <img
                      src={follow.avatar}
                      alt='avatar'
                      className='rounded-lg w-full h-[108px] sm:h-[200px] lg:h-[108px] object-cover'
                    />
                    <p className='font-medium text-sm text-gray-700 text-center'>
                      {follow.firstname} {follow.lastname}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        )}
        {auth && auth.user && id === auth.user._id && (
          <div className='profile-info--followings md:rounded-lg p-3 bg-white mt-[2px] md:mt-4 md:shadow-lg'>
            <div className='my-3 flex items-center justify-between'>
              <h3 className='relative font-bold text-xl flex items-center'>
                Người theo dõi
                <span className='ml-2 flex w-6 h-6 bg-red-500 text-white rounded-full'>
                  <span className='m-auto text-sm'>{user.friends.length}</span>
                </span>
              </h3>
              <p
                className='py-1.5 px-4 hover:bg-gray-300 
                rounded-md cursor-pointer text-blue-600'
                onClick={() => handleToggle('showFriends')}
              >
                Xem tất cả
              </p>
            </div>
            <div className='grid grid-cols-3 gap-x-3 gap-y-9 mt-4 h-[300px] sm:h-[480px] lg:h-[300px] overflow-y-scroll'>
              {user &&
                user.friends.length > 0 &&
                user.friends.map((friend, i) => (
                  <Link to={`/profile/${friend._id}`} key={i}>
                    <img
                      src={friend.avatar}
                      alt='avatar'
                      className='rounded-lg w-full h-[108px] sm:h-[200px] lg:h-[108px] object-cover'
                    />
                    <p className='font-medium text-sm text-gray-700 text-center'>
                      {friend.firstname} {friend.lastname}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    ))
  )
}

export default About
