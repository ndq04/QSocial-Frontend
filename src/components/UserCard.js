import {Link} from 'react-router-dom'
function UserCard({user, handleCloseSearch}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <Link
      to={`/profile/${user._id}`}
      className='flex items-center hover:bg-gray-200 p-2 mb-2 rounded-lg transition-colors'
      onClick={handleCloseSearch}
    >
      <img
        src={user.avatar || PublicFolder + 'user.png'}
        alt='avatar'
        className='w-10 h-10 object-cover rounded-full'
      />
      <p className='ml-3 font-semibold'>
        {user.firstname} {user.lastname}
      </p>
    </Link>
  )
}

export default UserCard
