function BtnEditProfile({setOnEditProfile}) {
  return (
    <button
      className='absolute right-0 py-1.5 px-3 bg-gray-300 hover:bg-gray-400 
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
      <span>Chỉnh sửa thông tin cá nhân</span>
    </button>
  )
}

export default BtnEditProfile
