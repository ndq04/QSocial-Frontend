function About(data) {
  const {userData} = data
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
    userData.map((user) => (
      <div key={user._id}>
        <div className='profile-info--intro rounded-lg p-3 bg-white'>
          <h3 className='font-bold text-xl'>Giới thiệu</h3>
          <div className='flex items-center py-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Sống tại</span>
              <span className='font-semibold text-gray-900'>{user.livein}</span>
            </p>
          </div>
          <div className='flex items-center pb-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Đến từ</span>
              <span className='font-semibold text-gray-900'>{user.from}</span>
            </p>
          </div>
          <div className='flex items-center pb-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Nghề nghiệp</span>
              <span className='font-semibold text-gray-900'>{user.job}</span>
            </p>
          </div>
          <div className='flex items-center pb-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Giới tính</span>
              <span className='font-semibold text-gray-900'>
                {getGender(user.gender)}
              </span>
            </p>
          </div>
          <div className='flex items-center pb-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Đã tham gia</span>
              <span className='font-semibold text-gray-900'>
                {user.createdAt}
              </span>
            </p>
          </div>
        </div>

        <div className='profile-info--friends rounded-lg p-3 bg-white my-3'>
          <h3 className='font-bold text-xl'>Bạn bè</h3>
          <ul className='grid grid-cols-3 gap-3 py-3'>
            <li>
              <img src='avatar.jpg' alt='img' className='rounded-lg' />
              <p className='text-gray-600 text-sm font-semibold'>Quang Duy</p>
            </li>
          </ul>
        </div>
      </div>
    ))
  )
}

export default About
