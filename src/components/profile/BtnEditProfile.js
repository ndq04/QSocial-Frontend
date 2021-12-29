function BtnEditProfile({setOnEditProfile}) {
  return (
    <button
      className='absolute right-[10%] lg:right-[5%] py-2 px-3 bg-gray-200 md:hover:bg-gray-300 
      rounded-lg font-semibold flex items-center dark:bg-[#3a3b3c] md:dark:hover:bg-[#666768] text-[#fe2c55]'
      onClick={() => setOnEditProfile(true)}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5 lg:mr-1'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
      </svg>
      <span className='hidden lg:block'>Chỉnh sửa thông tin cá nhân</span>
    </button>
  )
}

export default BtnEditProfile
