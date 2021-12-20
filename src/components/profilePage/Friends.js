import FriendsCard from './FriendsCard'

function Friends({userData}) {
  return (
    <div className='max-w-6xl m-auto bg-white p-4 rounded-lg mt-5 dark:bg-[#282928]'>
      {userData.length > 0 &&
        userData.map((user) => (
          <FriendsCard key={user._id} user={user.friends} />
        ))}
    </div>
  )
}

export default Friends
