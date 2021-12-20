function OnlineFriend() {
  return (
    <li
      className='flex items-center mb-1 px-2 py-1.5 
      rounded-md hover:bg-gray-200 cursor-pointer relative dark:hover:bg-[#414345]'
    >
      <span
        className='absolute w-3 h-3 rounded-full
       bg-green-500 border-2 top-1 left-1 dark:bg-green-400'
      ></span>
      <img src='user1.jpg' alt='avatar' className='w-8 h-8 rounded-full mr-2' />
      <p className='text-gray-800 font-semibold dark:text-gray-200'>Quang</p>
    </li>
  )
}

export default OnlineFriend
