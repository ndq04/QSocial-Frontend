import CommentList from '../comment/CommentList'
import CommentInput from '../comment/CommentInput'

function Comment({pos}) {
  return (
    <div className='pt-2 mx-3 border-t-[1px] border-gray-300'>
      <CommentInput pos={pos} />
      <CommentList pos={pos} />
    </div>
  )
}

export default Comment
