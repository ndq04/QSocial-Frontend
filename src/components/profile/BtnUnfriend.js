function BtnUnfriend({unFriend}) {
  return (
    <div className='absolute right-[5%] flex'>
      <button
        className='py-1.5 px-3 bg-red-500 hover:bg-red-600 
        rounded-lg font-semibold flex items-center text-white'
        onClick={unFriend}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-1'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z' />
        </svg>
        <span>Hủy kết bạn</span>
      </button>
    </div>
  )
}

export default BtnUnfriend
