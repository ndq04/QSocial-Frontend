function ProfileHead({userData}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    userData.length > 0 &&
    userData.map((user) => (
      <div key={user._id} className='profile-head h-[65vh] bg-white shadow-sm'>
        <div className='relative max-w-[65%] h-[75%] mx-auto'>
          <img
            src={user.coverimage || PublicFolder + 'bg.jpg'}
            alt='img'
            className='w-full h-[100%] object-cover rounded-b-lg'
          />
          <img
            src={user.avatar || PublicFolder + 'user.png'}
            alt='img'
            className='absolute w-48 h-48 rounded-full border-4
border-white left-[50%] -translate-x-1/2 top-[50%]'
          />
        </div>

        <div
          className='relative max-w-[65%] h-[15%] m-auto flex items-end justify-center
    font-bold'
        >
          <h3 className='text-[32px]'>
            {user.firstname} {user.lastname}
          </h3>
          <button
            className='absolute py-2 px-3 bg-blue-500 hover:bg-blue-700 
      rounded-lg text-white flex items-center right-[5%] top-1/2'
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
        </div>

        <div className='max-w-[65%] h-[10%] m-auto flex items-center'>
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
      </div>
    ))
  )
}

export default ProfileHead
