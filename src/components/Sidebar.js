import {useState} from 'react'
import {useSelector} from 'react-redux'
import {SidebarData, SidebarMore} from '../data/Sidebar'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const {auth} = useSelector((state) => state)
  return (
    <div className='sidebar h-[calc(100vh-60px)] py-4 overflow-y-scroll'>
      <ul>
        <li className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer'>
          <img
            src={auth.user.avatar}
            alt='avatar'
            className='w-8 h-8 rounded-full mr-2'
          />
          <p className='text-gray-800 font-semibold'>
            {auth.user.firstname} {auth.user.lastname}
          </p>
        </li>
        {SidebarData.map((sidebar) => (
          <li
            key={sidebar.id}
            className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer'
          >
            <img
              src={sidebar.img}
              alt={sidebar.title}
              className='w-8 h-8 rounded-full mr-2'
            />
            <p className='text-gray-800 font-semibold'>{sidebar.title}</p>
          </li>
        ))}

        {!isOpen && (
          <li
            className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer'
            onClick={() => setIsOpen(true)}
          >
            <div className=' flex w-8 h-8 bg-gray-300 rounded-full mr-2'>
              <svg
                viewBox='0 0 16 16'
                width='1em'
                height='1em'
                className='a8c37x1j ms05siws hwsy1cff b7h9ocf4 fzdkajry jnigpg78 odw8uiq3 m-auto'
              >
                <g fillRule='evenodd' transform='translate(-448 -544)'>
                  <path
                    fillRule='nonzero'
                    d='M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z'
                  ></path>
                </g>
              </svg>
            </div>
            <p className='text-gray-800 font-semibold'>Xem thêm</p>
          </li>
        )}

        {isOpen &&
          SidebarMore.map((sidebar) => (
            <li
              key={sidebar.id}
              className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer'
            >
              <img
                src={sidebar.img}
                alt={sidebar.title}
                className='w-8 h-8 rounded-full mr-2'
              />
              <p className='text-gray-800 font-semibold'>{sidebar.title}</p>
            </li>
          ))}

        {isOpen && (
          <li
            className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer'
            onClick={() => setIsOpen(false)}
          >
            <div className=' flex w-8 h-8 bg-gray-300 rounded-full mr-2'>
              <svg
                viewBox='0 0 20 20'
                width='1.2em'
                height='1.2em'
                className='a8c37x1j ms05siws hwsy1cff b7h9ocf4 fzdkajry jnigpg78 odw8uiq3 m-auto'
              >
                <path d='M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z'></path>
              </svg>
            </div>
            <p className='text-gray-800 font-semibold'>Ẩn bớt</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
