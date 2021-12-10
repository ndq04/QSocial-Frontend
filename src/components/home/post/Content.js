import {useSelector} from 'react-redux'
import Status from './Status'
import Posts from './Posts'

function Content({handleToggle}) {
  const {homePost} = useSelector((state) => state)
  return (
    <div className='content col-span-2 w-full px-[10%] h-[calc(100vh-60px)] py-4 overflow-y-scroll'>
      <Status handleToggle={handleToggle} />
      {homePost && homePost.loading ? (
        ''
      ) : homePost.result === 0 ? (
        <h4>No Post Available</h4>
      ) : (
        <Posts />
      )}
    </div>
  )
}

export default Content
