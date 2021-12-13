import GlobalCard from './GlobalCard'

function FollowingsCard({user, handleToggle}) {
  return (
    <>
      <h3 className='text-xl font-bold flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 sm:cursor-pointer'
          viewBox='0 0 20 20'
          fill='currentColor'
          onClick={() => handleToggle('showAccount')}
        >
          <path
            fillRule='evenodd'
            d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
            clipRule='evenodd'
          />
        </svg>
        <span className='mx-2'>Đang theo dõi</span>
        <span className='text-red-500'>{user.length}</span>
      </h3>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-4'>
        {user.length > 0 &&
          user.map((fol) => <GlobalCard key={fol._id} user={fol} />)}
      </div>
    </>
  )
}

export default FollowingsCard
