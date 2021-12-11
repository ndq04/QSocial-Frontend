import CommentItem from './CommentItem'

function CommentList({pos, setShowComment}) {
  return (
    <div className='pb-3'>
      {pos.comments &&
        pos.comments.map((comment, i) => (
          <CommentItem key={i} comment={comment} pos={pos} />
        ))}

      <div
        onClick={() => setShowComment(false)}
        className='text-sm font-semibold text-gray-500 hover:underline cursor-pointer'
      >
        Ẩn bình luận
      </div>
    </div>
  )
}

export default CommentList
