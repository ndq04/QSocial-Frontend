import {useState, useEffect} from 'react'
import axios from 'axios'
import Post from './Post'
import Status from './Status'

function ContentProfile({username}) {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `/posts/profile/${username}`
      )
      setPosts(res.data.posts)
    }
    fetchPosts()
  }, [username])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `/users?username=${username}`
      )
      setUser(res.data.user)
    }
    fetchUser()
  }, [username])
  return (
    <div className='profile h-[calc(100vh-60px)] overflow-y-scroll'>
      <div className='profile-head h-[60vh] bg-white shadow-sm'>
        <div className='relative max-w-[65%] h-[80%] mx-auto mb-5'>
          <img
            src='background.jpg'
            alt='img'
            className='w-full h-[100%] object-cover rounded-b-lg'
          />
          <img
            src='avatar.jpg'
            alt='img'
            className='absolute w-48 h-48 rounded-full border-4
            border-white left-[50%] -translate-x-1/2 top-[50%]'
          />
        </div>
        <h3 className='text-center font-bold text-[32px]'>
          {user.username}
        </h3>
      </div>

      <div className='profile-body flex max-w-[60%] mx-auto mt-4'>
        <div className='profile-info w-[40%] mr-4'>
          <div className='profile-info--intro rounded-lg p-3 bg-white'>
            <h3 className='font-bold text-xl'>
              Giới thiệu
            </h3>
            <div className='flex items-center py-3'>
              <p className='text-gray-600'>
                Sống tại{' '}
                <span className='font-semibold text-gray-900'>
                  Hà Nội
                </span>
              </p>
            </div>
            <div className='flex items-center pb-3'>
              <p className='text-gray-600'>
                Đến từ{' '}
                <span className='font-semibold text-gray-900'>
                  Hà Nội
                </span>
              </p>
            </div>
            <div className='flex items-center pb-3'>
              <p className='text-gray-600'>
                Mối quan hệ{' '}
                <span className='font-semibold text-gray-900'>
                  Độc thân
                </span>
              </p>
            </div>
          </div>
          <div className='profile-info--friends rounded-lg p-3 bg-white my-3'>
            <h3 className='font-bold text-xl'>Bạn bè</h3>
            <ul className='grid grid-cols-3 gap-3 py-3'>
              <li>
                <img
                  src='avatar.jpg'
                  alt='img'
                  className='rounded-lg'
                />
                <p className='text-gray-600 text-sm font-semibold'>
                  Quang Duy
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className='profile-feed rounded-lg w-[60%]'>
          <Status user={user} />
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContentProfile
