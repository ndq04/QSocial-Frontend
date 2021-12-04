import About from './About'
import Posts from './Posts'
import ProfileStatus from './ProfileStatus'

function ProfileBody(data) {
  return (
    <div className='profilebody w-full px-4 grid grid-cols-5 gap-4 mt-4 '>
      <div className='profilebody-left'>
        <About {...data} />
      </div>
      <div className='profilebody-center col-span-2'>
        <Posts {...data} />
      </div>
      <div className='profilebody-right rounded-lg col-span-2'>
        <ProfileStatus {...data} />
      </div>
    </div>
  )
}

export default ProfileBody
