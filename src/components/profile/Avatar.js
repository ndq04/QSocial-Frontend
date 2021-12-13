function Avatar({user, auth, setOnEditAvatar}) {
  return (
    <div className='absolute left-[50%] -translate-x-1/2 bottom-[-20%] sm:bottom-[-10%] sm:w-52 sm:h-52 w-48 h-48 rounded-full flex'>
      <img
        src={user.avatar}
        alt='img'
        className='w-[90%] h-[90%] m-auto object-cover rounded-full border-4
      border-white'
      />
      {auth.user._id === user._id && (
        <div
          className='absolute right-[5%] bottom-[15%] flex cursor-pointer
          w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400'
          onClick={() => setOnEditAvatar(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 m-auto'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default Avatar
