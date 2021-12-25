import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom/cjs/react-router-dom.min'
import {RightbarPR} from '../../data/Rightbar'
import {AddUser} from '../../redux/actions/messageActions'
import OnlineFriend from '../OnlineFriend'

function Rightbar() {
  const {auth, message} = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory(0)

  const handleAddChat = (user) => {
    dispatch(AddUser({user, message}))
    history.push(`/message/${user._id}`)
  }
  return (
    <div className='rightbar h-[calc(100vh-60px)] py-4 overflow-y-scroll hidden xl:block'>
      <h3 className='mb-1 px-2 py-1 text-gray-500 font-semibold dark:text-gray-200'>
        Được tài trợ
      </h3>
      <ul className='border-b border-gray-300 pb-3 pr-3 dark:border-gray-600'>
        {RightbarPR.map((rightbar) => (
          <li key={rightbar.id}>
            <a
              href={rightbar.value.url}
              target='blank'
              className='flex items-center mb-1 px-2 py-1.5 rounded-lg hover:bg-gray-200 cursor-pointer dark:hover:bg-[#414345]'
            >
              <img
                src={rightbar.value.img}
                alt={rightbar.value.title}
                className='w-[100px] h-[100px] object-cover rounded-lg mr-4 flex-shrink-0'
              />
              <div className='flex-1'>
                <p className='text-gray-800 font-semibold dark:text-gray-200'>
                  {rightbar.value.title}
                </p>
                <p className='text-gray-400 text-sm'>
                  {rightbar.value.subTitle}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <h3 className='mb-1 px-2 pt-3 pb-1 text-gray-500 font-semibold dark:text-gray-200'>
        Người liên hệ
        <p
          className='ml-1 text-[12px] left-[50%] w-[18px] h-[18px] rounded-full 
        bg-[#e41e3f] text-white inline-flex'
        >
          <span className='m-auto'>{auth.user.followings.length}</span>
        </p>
      </h3>
      <ul>
        {auth.user.followings.map((user) => (
          <div key={user._id} onClick={() => handleAddChat(user)}>
            <OnlineFriend user={user} />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Rightbar
