import {useSelector} from 'react-redux'
import Status from './../home/post/Status'
import About from './About'
import SingleUserPosts from './SingleUserPosts'

function ProfileBody({handleToggle, ...data}) {
  const {id, auth} = data
  const {homePost} = useSelector((state) => state)

  return (
    <div className='profilebody max-w-6xl md:mx-10 xl:mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:mt-4'>
      <div className='profilebody-left'>
        <About {...data} handleToggle={handleToggle} />
      </div>
      <div className='profilebody-right rounded-lg lg:col-span-2'>
        {auth && auth.user && id === auth.user._id && <Status />}
        {homePost && homePost.loading ? (
          'Đang tải...'
        ) : homePost.resultUserPost === 0 ? (
          <div className='w-full relative'>
            <img
              src='https://res.cloudinary.com/doltvro6d/image/upload/v1639408951/qsocial/Screenshot_2021-12-13_222134_ohqc1x.png'
              alt='no post'
              className='w-full rounded-lg'
            />
            <span
              className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
              text-3xl text-gray-700'
            >
              Chưa có bài viết nào
            </span>
          </div>
        ) : (
          <SingleUserPosts {...data} />
        )}
      </div>
    </div>
  )
}

export default ProfileBody
