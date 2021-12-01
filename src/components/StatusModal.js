import {useContext} from 'react'
import {ModalData} from '../data/Modal'
import {StatusContext} from '../contexts/StatusContext'

function Modal() {
  const {handleToggle} = useContext(StatusContext)
  return (
    <div className='select-none'>
      <div className='modal fixed inset-0 bg-gray-500 opacity-50'></div>
      <div
        className='inner w-[32%] bg-[#f0f2f5] h-[70%] 
        shadow-lg absolute top-1/2 -translate-y-1/2 
        -translate-x-1/2 left-1/2 z-10 rounded-lg 
        flex flex-col p-4'
      >
        <div
          className='modal-head flex items-center 
          justify-center relative pb-4 border-b 
          border-gray-300'
        >
          <h3 className='font-bold text-xl'>
            Tạo bài viết
          </h3>
          <div
            className='absolute right-1 top-0 cursor-pointer w-9 h-9 
          bg-gray-200 hover:bg-gray-300 rounded-full flex'
            onClick={handleToggle}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 m-auto text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
        </div>

        <div className='modal-name'>
          <li className='flex items-center mb-1 py-4'>
            <img
              src='avatar.jpg'
              alt='avatar'
              className='w-8 h-8 rounded-full mr-2'
            />
            <p className='text-gray-800 font-semibold'>
              Quang
            </p>
          </li>
        </div>
        <div
          className='modal-text rounded-lg overflow-hidden 
          h-1/2 bg-white shadow-md'
        >
          <textarea
            className='w-full h-full outline-none p-4 
            resize-none bg-white text-xl'
            placeholder='Bạn đang nghĩ gì thế ?'
          ></textarea>
        </div>

        <div
          className='modal-option my-6 flex items-center 
          justify-around bg-white rounded-md py-3 shadow-md'
        >
          <h3 className='font-semibold'>
            Thêm vào bài viết
          </h3>
          <ul className='flex items-center justify-between'>
            {ModalData.map((item) => (
              <li
                key={item.id}
                className='flex items-center p-2 rounded-full 
                hover:bg-gray-200 cursor-pointer'
              >
                {item.img}
              </li>
            ))}
          </ul>
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-700 py-1.5 
          rounded-md text-white font-semibold'
        >
          Đăng
        </button>
      </div>
    </div>
  )
}

export default Modal
