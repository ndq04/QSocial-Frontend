function UserCardMessage({user, handleCloseSearch}) {
  return (
    <div
      className='flex items-center hover:bg-[#e4e6eb] p-2 rounded-lg transition-colors dark:text-gray-200 dark:hover:bg-[#414345]'
      onClick={handleCloseSearch}
    >
      <img
        src={user?.avatar}
        alt='avatar'
        className='w-[50px] h-[50px] object-cover rounded-full'
      />
      <p className='ml-3 font-semibold'>
        {user?.firstname} {user?.lastname}
      </p>
    </div>
  )
}

export default UserCardMessage
