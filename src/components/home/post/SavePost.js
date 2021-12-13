function SavePost({saved, handleSaved}) {
  return saved ? (
    <div
      className='save-post flex items-center justify-center cursor-pointer text-purple-600 py-1.5
    rounded-md transition-colors duration-200'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 13l4 4L19 7'
        />
      </svg>
      <span className='font-semibold ml-2'>Đã lưu</span>
    </div>
  ) : (
    <div
      className='save-post flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 py-1.5
      rounded-md transition-colors duration-200'
      onClick={handleSaved}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
        />
      </svg>
      <span className='font-semibold ml-2'>Lưu</span>
    </div>
  )
}

export default SavePost
