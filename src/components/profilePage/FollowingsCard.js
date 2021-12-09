import GlobalCard from './GlobalCard'

function FollowingsCard({user}) {
  return (
    <>
      <h3 className='text-xl font-bold'>
        <span className='mr-2'>Đang theo dõi</span>
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
