import {useContext} from 'react'
import {ModalData} from './../data/Modal'
import {StatusContext} from '../contexts/StatusContext'

function Status() {
  const {handleToggle} = useContext(StatusContext)
  const ModalDataFilter = ModalData.filter(
    (item) => item.id !== 4
  )
  return (
    <div className='status w-[100%] m-auto bg-white shadow-md rounded-xl p-3'>
      <div className='flex items-center cursor-pointer border-b border-gray-300 pb-4 mb-4'>
        <img
          src='avatar.jpg'
          alt='avatar'
          className='w-10 h-10 rounded-full mr-2'
        />
        <p
          className='text-gray-500bg-gray-100 hover:bg-gray-200 flex-1 px-3 py-2.5 rounded-full'
          onClick={handleToggle}
        >
          Bạn đang nghĩ gì thế ?
        </p>
      </div>
      <ul className='flex flex-col'>
        {ModalDataFilter.map((item) => (
          <li
            key={item.id}
            className='flex items-center p-2 rounded-md 
              hover:bg-gray-200 cursor-pointer'
            onClick={handleToggle}
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
