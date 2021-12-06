import FriendsCard from './FriendsCard'

function Friends(data) {
  const {userData} = data

  return (
    userData.length > 0 &&
    userData.map((user) => <FriendsCard key={user._id} user={user.friends} />)
  )
}

export default Friends
