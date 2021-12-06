import {data} from 'autoprefixer'
import About from './About'
import Posts from './Posts'
import ProfileStatus from './ProfileStatus'

function ProfileBody({handleToggle, ...data}) {
  return (
    <div className='profilebody max-w-5xl m-auto grid grid-cols-3 gap-4'>
      <div className='profilebody-left'>
        <About {...data} handleToggle={handleToggle} />
      </div>
      <div className='profilebody-center'>
        <Posts {...data} />
      </div>
      <div className='profilebody-right rounded-lg'>
        <ProfileStatus {...data} />
      </div>
    </div>
  )
}

export default ProfileBody
