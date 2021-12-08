import {useState} from 'react'
import Avatar from './Avatar'
import EditAvatar from './EditAvatar'
import EditProfile from './EditProfile'
import BtnEditProfile from './BtnEditProfile'
import BtnEditCoverimage from './BtnEditCoverimage'
import GlobalBtnFriend from './GlobalBtnFriend'
import EditCoverimage from './EditCoverimage'

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
        className='profileinfo h-[60vh] bg-white shadow-sm border-b-2'
      >
        <div className='relative max-w-6xl h-[80%] mx-auto'>
          <img
            src={user.coverimage}
            alt='img'
            className='w-full h-[100%] object-cover rounded-b-lg'
          />
          <Avatar user={user} auth={auth} setOnEditAvatar={setOnEditAvatar} />
          {auth && user._id && auth.user._id === user._id && (
            <BtnEditCoverimage setOnEditCoverimage={setOnEditCoverimage} />
          )}
        </div>

        <div className='relative max-w-6xl h-[20%] m-auto flex items-center justify-center'>
          {auth && user._id && auth.user._id === user._id ? (
            <BtnEditProfile setOnEditProfile={setOnEditProfile} />
          ) : (
            <GlobalBtnFriend user={user} />
          )}
          {auth && user._id && auth.user._id === user._id && (
            <div className='absolute left-0 flex items-center'>
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
