import FollowingsCard from './FollowingsCard'

function Followings({userData}) {
  return (
    <div className='max-w-6xl m-auto bg-white p-4 rounded-lg mt-4 dark:bg-[#282928]'>
      {userData.length > 0 &&
        userData.map((user) => (
          <FollowingsCard key={user._id} user={user.followings} />
        ))}
    </div>
  )
}

export default Followings
