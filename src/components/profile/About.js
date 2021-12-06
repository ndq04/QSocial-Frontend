import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {getProfileUsers} from './../../redux/actions/profileActions'

function About({handleToggle, ...data}) {
  const [friends, setFriends] = useState([])
  const {userData, profile, auth} = data
  const {id} = useParams()
  const dispatch = useDispatch()

  const getGender = (value) => {
    switch (value) {
      case 'male':
        return 'Nam'
      default:
        return 'Nữ'
    }
  }
  // console.log(userData[0])

  // useEffect(() => {
  //   dispatch(getProfileUsers({users: userData[0].friends, id, auth}))
  //   const newData = profile.users.filter((user) => user._id === id)
  //   setUserData(newData)
  // })
  return (
    userData.length > 0 &&
    userData.map((user) => (
      <div key={user._id}>
        <div className='profile-info--intro rounded-lg p-3 bg-white shadow-lg'>
          <h3 className='font-bold text-xl'>Giới thiệu</h3>
          <div className='flex items-center py-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Sống tại</span>
              <span className='font-semibold text-gray-900'>{user.livein}</span>
            </p>
          </div>
          <div className='flex items-center pb-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Đến từ</span>
              <span className='font-semibold text-gray-900'>{user.from}</span>
            </p>
          </div>
          <div className='flex items-center pb-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Nghề nghiệp</span>
              <span className='font-semibold text-gray-900'>{user.job}</span>
            </p>
          </div>
          <div className='flex items-center pb-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Giới tính</span>
              <span className='font-semibold text-gray-900'>
                {getGender(user.gender)}
              </span>
            </p>
          </div>
          <div className='flex items-center pb-3'>
            <p className='text-gray-600'>
              <span className='mr-1'>Đã tham gia</span>
              <span className='font-semibold text-gray-900'>
                {user.createdAt}
              </span>
            </p>
          </div>
        </div>
        {auth && auth.user && id === auth.user._id && (
          <div className='profile-info--followings rounded-lg p-3 bg-white my-4 shadow-lg'>
            <div className='my-3 flex items-center justify-between'>
              <h3 className='relative font-bold text-xl flex items-center'>
                Đang theo dõi{' '}
                <span className='ml-2 flex w-7 h-7 p-1 bg-black text-white rounded-full'>
                  <span className='m-auto text-sm'>
                    {user.followings.length}
                  </span>
                </span>
              </h3>
              <p
                className='py-1.5 px-4 hover:bg-gray-300 
                rounded-md cursor-pointer text-blue-600'
                onClick={() => handleToggle('showFriends')}
              >
                Xem tất cả
              </p>
            </div>
            <div className='grid grid-cols-3 gap-x-3 gap-y-8 mt-5 h-[410px] overflow-hidden'>
              {user &&
                user.followings.length > 0 &&
                user.followings.map((follow) => (
                  <Link to={`/profile/${follow._id}`} key={follow._id}>
                    <img
                      src={follow.avatar}
                      alt='avatar'
                      className='rounded-lg'
                    />
                    <p className='font-medium text-sm text-gray-700 text-center'>
                      {follow.firstname} {follow.lastname}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    ))
  )
}

export default About
