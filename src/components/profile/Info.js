import {useState} from 'react'
import Avatar from './Avatar'
import EditAvatar from './EditAvatar'
import EditProfile from './EditProfile'

function Info(data) {
  const {userData, auth} = data

  const [onEditProfile, setOnEditProfile] = useState(false)
  const [onEditAvatar, setOnEditAvatar] = useState(false)

  return (
    userData.length > 0 &&
    userData.map((user) => (
      <div key={user._id} className='profile-head h-[65vh] bg-white shadow-sm'>
        <div className='relative max-w-5xl h-[70%] mx-auto'>
          <img
            src={user.coverimage}
            alt='img'
            className='w-full h-[100%] object-cover rounded-b-lg'
          />
          <Avatar user={user} auth={auth} setOnEditAvatar={setOnEditAvatar} />
        </div>

        <div
          className='relative max-w-5xl h-[20%] m-auto flex items-center justify-center
          font-bold border-b border-gray-300'
        >
          <h3 className='text-[32px]'>
            {user.firstname} {user.lastname}
          </h3>
          {auth && user._id && auth.user._id !== user._id && (
            <button
              className='absolute py-2 px-3 bg-blue-500 hover:bg-blue-700 
            rounded-lg text-white font-semibold flex items-center right-[5%]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4v16m8-8H4'
                />
              </svg>
              <span>Thêm bạn bè</span>
            </button>
          )}
        </div>

        <div className='max-w-5xl h-[10%] m-auto flex items-center justify-between'>
          <div className='flex items-center'>
            <p className='mr-3'>
              Bạn bè <strong>0</strong>
            </p>
            <p className='mr-3'>
              Đang theo dõi <strong>0</strong>
            </p>
            <p>
              Bài viết <strong>0</strong>
            </p>
          </div>
          {auth && user._id && auth.user._id === user._id && (
            <div>
              <button
                className='py-1.5 px-3 bg-gray-300 hover:bg-gray-400 
              rounded-lg font-semibold flex items-center'
                onClick={() => setOnEditProfile(true)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                </svg>
                <span>Chỉnh sửa thông tin</span>
              </button>
            </div>
          )}
        </div>
        {onEditProfile && (
          <EditProfile {...data} setOnEditProfile={setOnEditProfile} />
        )}
        {onEditAvatar && <EditAvatar setOnEditAvatar={setOnEditAvatar} />}
      </div>
    ))
  )
}

export default Info
