import CommentItem from './CommentItem'

function CommentList({pos}) {
  return (
    <div className='pb-3'>
      {pos.comments &&
        pos.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} pos={pos} />
        ))}
    </div>
  )
}

export default CommentList
