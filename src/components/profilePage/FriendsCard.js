import GlobalCard from './GlobalCard'

function FriendsCard(data) {
  const {userData} = data
  console.log(userData)
  return (
    userData.length > 0 &&
    userData.map((user) => <GlobalCard key={user._id} user={user} />)
  )
}

export default FriendsCard
