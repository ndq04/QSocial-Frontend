import {useSelector} from 'react-redux'
import Posts from './Posts'
import Status from './Status'

function Content({handleToggle}) {
  const {homePost} = useSelector((state) => state)
  return (
    <div className='content col-span-2 w-full sm:px-[8px] xl:px-[10%] py-4 overflow-y-scroll'>
      <Status handleToggle={handleToggle} />
      {homePost && homePost.loading ? (
        <div className='lds-spinner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : homePost.result === 0 ? (
        <div className='w-full relative'>
          <img
            src='https://res.cloudinary.com/quangnd/image/upload/v1639408951/qsocial/Screenshot_2021-12-13_222134_ohqc1x.png'
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
        <Posts />
      )}
    </div>
  )
}

export default Content
