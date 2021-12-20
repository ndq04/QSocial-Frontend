function UserCardMessage({user, handleCloseSearch}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div
      className='flex items-center hover:bg-[#e4e6eb] p-4 mb-2 rounded-lg transition-colors dark:text-gray-200 dark:hover:bg-[#414345]'
      onClick={handleCloseSearch}
    >
      <img
        src={user?.avatar || PublicFolder + 'logo.png'}
        alt='avatar'
        className='w-10 h-10 object-cover rounded-full'
      />
      <p className='ml-3 font-semibold'>
        {user?.firstname} {user?.lastname}
      </p>
    </div>
  )
}

export default UserCardMessage
