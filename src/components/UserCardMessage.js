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
        className='lg:w-[50px] lg:h-[50px] w-10 h-10 object-cover rounded-full'
      />
      <div>
        <p className='px-3 font-semibold text-sm lg:text-base'>
          {user?.firstname} {user?.lastname}
        </p>
      </div>
    </div>
  )
}

export default UserCardMessage
