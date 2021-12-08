import GlobalCard from './GlobalCard'

function FriendsCard({user}) {
  return (
    <>
      <h3 className='text-xl font-bold'>
        <span className='mr-2'>Người theo dõi</span>
        <span className='text-red-500'>{user.length}</span>
      </h3>
      <div className='grid grid-cols-4 gap-3'>
        {user.length > 0 &&
          user.map((fr) => <GlobalCard key={fr._id} user={fr} />)}
      </div>
    </>
  )
}

export default FriendsCard
