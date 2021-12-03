import {useEffect} from 'react'

function Toast({msg, bgColor, handleShow}) {
  useEffect(() => {
    setTimeout(() => {
      handleShow()
    }, 3000)

    return () => {
      console.log('clean up')
      clearTimeout()
    }
  })
  return (
    <div
      className={`toast fixed top-5 right-[5%] 
      rounded-md ${bgColor} transition-colors 
      text-white w-80 z-50 select-none`}
    >
      <div
        className='toast-head flex items-center justify-between w-[90%] mx-auto
        border-b border-white py-3'
      >
        <h3 className='font-semibold'>{msg.title}</h3>
        <p
          className='cursor-pointer h-8 w-8 rounded-full 
         hover:bg-white flex'
          onClick={handleShow}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 m-auto text-gray-800'
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
        </p>
      </div>
      <div className='toast-body py-3 w-[90%] mx-auto'>
        <p className='text-center font-semibold'>{msg.body}</p>
      </div>
    </div>
  )
}

export default Toast
