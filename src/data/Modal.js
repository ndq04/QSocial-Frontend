const Photo = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-7 w-7 text-green-500'
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
        clipRule='evenodd'
      />
    </svg>
  )
}

const Tag = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-7 w-7 text-blue-600'
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z'
        clipRule='evenodd'
      />
    </svg>
  )
}

const Emoji = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-7 w-7 text-yellow-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  )
}

export const ModalData = [
  {
    id: 1,
    title: 'Ảnh',
    img: <Photo />,
  },
  {
    id: 2,
    title: 'Gắn thẻ',
    img: <Tag />,
  },
  {
    id: 3,
    title: 'Cảm xúc',
    img: <Emoji />,
  },
]
