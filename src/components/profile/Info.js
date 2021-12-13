import {useState} from 'react'
import Avatar from './Avatar'
import BtnEditCoverimage from './BtnEditCoverimage'
import BtnEditProfile from './BtnEditProfile'
import EditAvatar from './EditAvatar'
import EditCoverimage from './EditCoverimage'
import EditProfile from './EditProfile'
import GlobalBtnFriend from './GlobalBtnFriend'

function Info(data) {
  const [onEditProfile, setOnEditProfile] = useState(false)
  const [onEditAvatar, setOnEditAvatar] = useState(false)
  const [onEditCoverimage, setOnEditCoverimage] = useState(false)

  const {userData, auth} = data

  return (
    userData.length > 0 &&
    userData.map((user) => (
      <div
        key={user._id}
        className='profileinfo h-[60vh] bg-white sm:shadow-sm sm:border-b-2 border-b-[1px]'
      >
        <div className='relative sm:max-w-6xl h-[70%] sm:h-[80%] mt-[1px] sm:mt-0 mx-auto p-3 sm:p-0'>
          <img
            src={user.coverimage}
            alt='img'
            className='w-full h-full object-cover rounded-t-xl sm:rounded-t-none sm:rounded-b-xl'
          />
          <Avatar user={user} auth={auth} setOnEditAvatar={setOnEditAvatar} />
          {auth && user._id && auth.user._id === user._id && (
            <BtnEditCoverimage setOnEditCoverimage={setOnEditCoverimage} />
          )}
        </div>

        <div className='relative max-w-6xl h-[30%] mt-5 sm:h-[20%] sm:m-auto flex items-center justify-center'>
          {auth && user._id && auth.user._id === user._id ? (
            <BtnEditProfile setOnEditProfile={setOnEditProfile} />
          ) : (
            <GlobalBtnFriend user={user} />
          )}
          {auth && user._id && auth.user._id === user._id && (
            <div className='absolute hidden  lg:left-[5%] left-0 lg:flex items-center'>
              <p className='mr-3'>
                <span className='mr-1 font-semibold text-gray-600'>
                  Người theo dõi
                </span>
                <span className='font-semibold text-lg'>
                  <span className='text-red-500'>{user.friends.length}</span>
                </span>
              </p>
              <p>
                <span className='mr-1 font-semibold text-gray-600'>
                  Đang theo dõi
                </span>
                <span className='font-semibold text-lg'>
                  <span className='text-red-500'>{user.followings.length}</span>
                </span>
              </p>
            </div>
          )}
          <h3 className='text-[32px] font-bold'>
            {user.firstname} {user.lastname}
          </h3>
        </div>
        {onEditProfile && (
          <EditProfile {...data} setOnEditProfile={setOnEditProfile} />
        )}
        {onEditAvatar && <EditAvatar setOnEditAvatar={setOnEditAvatar} />}
        {onEditCoverimage && (
          <EditCoverimage setOnEditCoverimage={setOnEditCoverimage} />
        )}
      </div>
    ))
  )
}

export default Info
