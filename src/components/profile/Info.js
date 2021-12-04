function Info() {
  return (
    <div className='profile-info w-[40%] mr-4'>
      <div className='profile-info--intro rounded-lg p-3 bg-white'>
        <h3 className='font-bold text-xl'>Giới thiệu</h3>
        <div className='flex items-center py-3'>
          <p className='text-gray-600'>
            Sống tại <span className='font-semibold text-gray-900'>Hà Nội</span>
          </p>
        </div>
        <div className='flex items-center pb-3'>
          <p className='text-gray-600'>
            Đến từ <span className='font-semibold text-gray-900'>Hà Nội</span>
          </p>
        </div>
        <div className='flex items-center pb-3'>
          <p className='text-gray-600'>
            Mối quan hệ{' '}
            <span className='font-semibold text-gray-900'>Độc thân</span>
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
  )
}

export default Info
