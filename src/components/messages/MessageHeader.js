function MessageHeader({user}) {
  return (
    <div className='h-[70px] w-full shadow dark:border-b dark:border-gray-600 flex items-center px-4 flex-shrink-0'>
      <div className='relative mr-2'>
        <img
          src={user?.avatar || 'https://i.imgur.com/iDuSx6e.png'}
          alt='avatar'
          className='w-11 h-11 object-cover rounded-full'
        />
        <span className='absolute bg-green-600 w-3 h-3 border-2 right-0 bottom-0 rounded-full'></span>
      </div>
      <p className='font-semibold dark:text-gray-300'>
        {user?.firstname} {user?.lastname}
      </p>
    </div>
  )
}

export default MessageHeader
