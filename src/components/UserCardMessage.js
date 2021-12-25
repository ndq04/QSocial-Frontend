function UserCardMessage({user, handleCloseSearch, data, id}) {
  return (
    <div
      className={`flex items-center md:hover:bg-[#f0f2f5] p-2 rounded-lg transition-colors 
      dark:text-gray-200 md:dark:hover:bg-[#414345] ${
        user?._id === id
          ? 'bg-[#eaf3ff] md:hover:bg-[#eaf3ff] dark:bg-[#252f3c] md:dark:hover:bg-[#252f3c]'
          : ''
      }`}
      onClick={handleCloseSearch}
    >
      <img
        src={user?.avatar}
        alt='avatar'
        className='w-[50px] h-[50px] object-cover rounded-full'
      />
      <div>
        <p className='ml-3 font-semibold'>
          {user?.firstname} {user?.lastname}
        </p>
        {user?._id === id && data?.length > 0 && (
          <small>{data[data.length + 1]?.text}</small>
        )}
      </div>
    </div>
  )
}

export default UserCardMessage
