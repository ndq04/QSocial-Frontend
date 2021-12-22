import {useEffect, useState} from 'react'
import CommentDisplay from './CommentDisplay'

function CommentList({pos, setShowComment}) {
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState([])
  const [replyComments, setReplyComments] = useState([])
  const [next, setNext] = useState(2)

  useEffect(() => {
    const ncm = pos.comments.filter((cm) => !cm.reply)
    setComments(ncm)
    setShowComments(ncm.slice(ncm.length - next))
  }, [pos.comments, next])

  useEffect(() => {
    const newRpl = pos.comments.filter((cm) => cm.reply)
    setReplyComments(newRpl)
  }, [pos.comments])

  return (
    <div className='pb-3'>
      {showComments &&
        showComments.map((comment, i) => (
          <CommentDisplay
            key={i}
            comment={comment}
            pos={pos}
            newReply={replyComments.filter(
              (item) => item.reply === comment._id
            )}
          />
        ))}
      <div className='flex items-center justify-between'>
        {comments.length - next > 0 ? (
          <div
            className='text-sm font-semibold text-gray-500 sm:hover:underline sm:cursor-pointer dark:text-gray-400'
            onClick={() => setNext((prev) => prev + 10)}
          >
            Xem thêm
          </div>
        ) : (
          comments.length > 2 && (
            <div
              className='text-sm font-semibold text-gray-500 sm:hover:underline sm:cursor-pointer dark:text-gray-400'
              onClick={() => setNext(2)}
            >
              Ẩn bớt
            </div>
          )
        )}
        <div
          onClick={() => setShowComment(false)}
          className='text-sm font-semibold text-gray-500 sm:hover:underline sm:cursor-pointer dark:text-gray-400'
        >
          Ẩn bình luận
        </div>
      </div>
    </div>
  )
}

export default CommentList
