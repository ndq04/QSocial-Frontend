function LikeComment({likeData}) {
  const {isLike, handleLike, handleUnLike} = likeData
  return isLike ? (
    <small
      className='hover:underline cursor-pointer font-bold text-blue-600 pl-3 pr-2'
      onClick={handleUnLike}
    >
      Thích
    </small>
  ) : (
    <small
      className='hover:underline cursor-pointer font-bold text-gray-500 pl-3 pr-2 dark:text-gray-400'
      onClick={handleLike}
    >
      Thích
    </small>
  )
}

export default LikeComment
