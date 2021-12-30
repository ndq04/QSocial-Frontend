import {useContext} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {StatusContext} from '../../../contexts/StatusContext'
import {ModalData} from '../../../data/Modal'

function Status() {
  const {toggleStatusModal} = useContext(StatusContext)

  const {auth} = useSelector((state) => state)

  return (
    <div className='status w-[100%] m-auto bg-white sm:border sm:border-gray-300 sm:dark:border-gray-600 sm:rounded-xl p-3 mb-4 dark:bg-[#282928]'>
      <div className='flex items-center sm:cursor-pointer border-b border-gray-300 pb-4 mb-4 dark:border-gray-600'>
        <Link to={`/profile/${auth.user._id}`}>
          <img
            src={auth.user.avatar}
            alt='avatar'
            className='w-10 h-10 object-cover rounded-full mr-2'
          />
        </Link>
        <p
          className='text-white bg-[#fe2c55] dark:bg-[#3a3b3c]
          md:hover:bg-[#f52650] flex-1 px-3 py-2 rounded-full'
          onClick={toggleStatusModal}
        >
          <span> {`${auth.user.lastname} ơi, bạn đang nghĩ gì thế ?`}</span>
        </p>
      </div>
      <ul className='grid grid-cols-3'>
        {ModalData.map((item) => (
          <li
            key={item.id}
            className='flex items-center p-1.5 rounded-md 
          hover:bg-gray-200 cursor-pointer dark:hover:bg-[#414345]'
            onClick={toggleStatusModal}
          >
            {item.img}
            <p className='ml-2 dark:text-gray-300'>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Status
