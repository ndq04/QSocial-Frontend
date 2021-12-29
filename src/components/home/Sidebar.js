import {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {SidebarData, SidebarMore} from '../../data/Sidebar'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const {auth} = useSelector((state) => state)
  return (
    <div className='sidebar h-[calc(100vh-60px)] py-4 overflow-y-scroll hidden lg:block'>
      <ul className='border-b border-gray-300 dark:border-gray-600'>
        <Link to={`/profile/${auth.user._id}`}>
          <li className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-[#414345]'>
            <img
              src={auth.user.avatar}
              alt='avatar'
              className='w-10 h-10 mr-2 rounded-full object-cover flex-shrink-0 border-2 p-[2px] border-[#fe2c55]'
            />
            <p className='text-[#fe2c55] font-semibold dark:text-gray-200'>
              {auth.user.firstname} {auth.user.lastname}
            </p>
          </li>
        </Link>
        {SidebarData.map((sidebar) => (
          <li
            key={sidebar.id}
            className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 
            cursor-pointer dark:hover:bg-[#414345]'
          >
            <img
              src={sidebar.img}
              alt={sidebar.title}
              className='w-8 h-8 rounded-full mr-2'
            />
            <p className='text-gray-800 font-semibold dark:text-gray-200'>
              {sidebar.title}
            </p>
          </li>
        ))}

        {!isOpen && (
          <li
            className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer dark:hover:bg-[#414345]'
            onClick={() => setIsOpen(true)}
          >
            <div className=' flex w-8 h-8 bg-gray-300 rounded-full mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 m-auto text-[#fe2c55]'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <p className='text-[#fe2c55] font-semibold'>Xem thêm</p>
          </li>
        )}

        {isOpen &&
          SidebarMore.map((sidebar) => (
            <li
              key={sidebar.id}
              className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer dark:hover:bg-[#414345]'
            >
              <img
                src={sidebar.img}
                alt={sidebar.title}
                className='w-8 h-8 rounded-full mr-2'
              />
              <p className='text-gray-800 font-semibold dark:text-gray-200'>
                {sidebar.title}
              </p>
            </li>
          ))}

        {isOpen && (
          <li
            className='flex items-center mb-1 px-2 py-1.5 rounded-md hover:bg-gray-200 
            cursor-pointer dark:hover:bg-[#414345]'
            onClick={() => setIsOpen(false)}
          >
            <div className=' flex w-8 h-8 bg-gray-300 rounded-full mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 m-auto text-[#fe2c55]'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <p className='text-[#fe2c55] font-semibold'>Ẩn bớt</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
