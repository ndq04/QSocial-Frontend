function LikePost({isLike, handleLike, handleUnLike}) {
  return isLike ? (
    <div
      className='flex items-center justify-center cursor-pointer text-[#fe2c55] hover:bg-gray-100 py-1.5 
      rounded-md transition-colors duration-200 px-2 dark:hover:bg-[#414345]'
      onClick={handleUnLike}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
          clipRule='evenodd'
        />
      </svg>
      <span className='font-semibold ml-1'>Thích</span>
    </div>
  ) : (
    <div
      className='flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 py-1.5
      rounded-md transition-colors duration-200 px-2 dark:hover:bg-[#414345]'
      onClick={handleLike}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6 dark:text-gray-300'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
          clipRule='evenodd'
        />
      </svg>
      <span className='font-semibold ml-1 dark:text-gray-300'>Thích</span>
    </div>
  )
}

export default LikePost
