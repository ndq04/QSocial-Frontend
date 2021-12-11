import CommentList from '../comment/CommentList'
import CommentInput from '../comment/CommentInput'

function Comment({pos, setShowComment}) {
  return (
    <div className='pt-2 mx-3 border-t-[1px] border-gray-300'>
      <CommentInput pos={pos} />
      <CommentList pos={pos} setShowComment={setShowComment} />
    </div>
  )
}

export default Comment
