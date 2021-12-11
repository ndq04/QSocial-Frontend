import FollowingsCard from './FollowingsCard'

function Followings(data) {
  const {userData} = data

  return (
    <div className='max-w-5xl m-auto bg-white p-4 rounded-lg'>
      {userData.length > 0 &&
        userData.map((user) => (
          <FollowingsCard key={user._id} user={user.followings} />
        ))}
    </div>
  )
}

export default Followings
