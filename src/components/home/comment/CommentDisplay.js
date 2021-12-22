import {useEffect, useState} from 'react'
import CommentItem from './CommentItem'

function CommentDisplay({comment, pos, newReply}) {
  const [showRep, setShowRep] = useState([])
  const [next, setNext] = useState(1)

  useEffect(() => {
    setShowRep(newReply.slice(newReply.length - next))
  }, [newReply, next])

  return (
    <CommentItem comment={comment} pos={pos} commentId={comment._id}>
      {showRep.map(
        (item, i) =>
          item.reply && (
            <CommentItem
              key={i}
              comment={item}
              commentId={comment._id}
              pos={pos}
            />
          )
      )}
      {newReply.length - next > 0 ? (
        <div
          className='text-sm font-semibold text-gray-500 sm:hover:underline sm:cursor-pointer dark:text-gray-400'
          onClick={() => setNext((prev) => prev + 10)}
        >
          Xem thêm phản hồi
        </div>
      ) : (
        newReply.length > 1 && (
          <div
            className='text-sm font-semibold text-gray-500 sm:hover:underline sm:cursor-pointer dark:text-gray-400'
            onClick={() => setNext(1)}
          >
            Ẩn bớt
          </div>
        )
      )}
    </CommentItem>
  )
}

export default CommentDisplay
