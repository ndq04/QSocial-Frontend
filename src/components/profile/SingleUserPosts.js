import Post from './../home/post/Post'

function SingleUserPosts({userPosts}) {
  return (
    <div>
      {userPosts &&
        userPosts.length > 0 &&
        userPosts.map((pos, index) => (
          <Post key={pos._id} pos={pos} index={index} />
        ))}
    </div>
  )
}

export default SingleUserPosts
