import {useContext} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {StatusContext} from '../../../contexts/StatusContext'
import {ModalData} from '../../../data/Modal'

function Status() {
  const {toggleStatusModal} = useContext(StatusContext)
  const ModalDataFilter = ModalData.filter((item) => item.id !== 4)

  const {auth} = useSelector((state) => state)

  return (
    <div className='status w-[100%] m-auto bg-white md:shadow-md md:rounded-xl p-3'>
      <div className='flex items-center sm:cursor-pointer border-b border-gray-300 pb-4 mb-4'>
        <Link to={`/profile/${auth.user._id}`}>
          <img
            src={auth.user.avatar}
            alt='avatar'
            className='w-10 h-10 object-cover rounded-full mr-2'
          />
        </Link>
        <p
          className='text-gray-600 text-lg bg-[#f0f2f5]
          hover:bg-gray-200 flex-1 px-3 py-2 rounded-full'
          onClick={toggleStatusModal}
        >
          <span> {`${auth.user.lastname} ơi, bạn đang nghĩ gì thế ?`}</span>
        </p>
      </div>
      <ul className='flex flex-col'>
        {ModalDataFilter.map((item) => (
          <li
            key={item.id}
            className='flex items-center p-2 rounded-md 
          hover:bg-gray-200 cursor-pointer'
            onClick={toggleStatusModal}
          >
            {item.img}
            <p className='ml-2'>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Status
