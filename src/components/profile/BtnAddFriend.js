function AddFriendBtn() {
  return (
    <button
      className='absolute py-2 px-3 bg-blue-500 hover:bg-blue-700 
      rounded-lg text-white font-semibold flex items-center right-[5%]'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5 mr-1'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
      </svg>
      <span>Thêm bạn bè</span>
    </button>
  )
}

export default AddFriendBtn
