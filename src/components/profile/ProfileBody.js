import About from './About'
import ProfileStatus from './ProfileStatus'
import SingleUserPosts from './SingleUserPosts'

function ProfileBody({handleToggle, ...data}) {
  return (
    <div className='profilebody max-w-5xl mx-auto grid grid-cols-3 gap-4 mt-4'>
      <div className='profilebody-left'>
        <About {...data} handleToggle={handleToggle} />
      </div>
      <div className='profilebody-right rounded-lg col-span-2'>
        <ProfileStatus {...data} />
        <SingleUserPosts {...data} />
      </div>
    </div>
  )
}

export default ProfileBody
