import Info from './Info'
import ProfileStatus from './ProfileStatus'

function ProfileBody({userData}) {
  return (
    <div className='profile-body flex max-w-[60%] mx-auto mt-4'>
      <Info userData={userData} />
      <div className='profile-feed rounded-lg w-[60%]'>
        <ProfileStatus userData={userData} />
      </div>
    </div>
  )
}

export default ProfileBody
