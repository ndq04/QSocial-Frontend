import FriendsCard from './FriendsCard'

function Friends(data) {
  const {userData} = data

  return (
    <div className='max-w-6xl m-auto bg-white p-4'>
      {userData.length > 0 &&
        userData.map((user) => (
          <FriendsCard key={user._id} user={user.friends} />
        ))}
    </div>
  )
}

export default Friends
