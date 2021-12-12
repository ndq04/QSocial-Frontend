import Status from './../home/post/Status'
import About from './About'
import SingleUserPosts from './SingleUserPosts'

function ProfileBody({handleToggle, ...data}) {
  const {id, auth} = data

  return (
    <div className='profilebody max-w-5xl mx-auto grid grid-cols-3 gap-4 mt-4'>
      <div className='profilebody-left'>
        <About {...data} handleToggle={handleToggle} />
      </div>
      <div className='profilebody-right rounded-lg col-span-2'>
        {auth && auth.user && id === auth.user._id && <Status />}
        <SingleUserPosts {...data} />
      </div>
    </div>
  )
}

export default ProfileBody
