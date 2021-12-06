function BtnEditCoverimage({setOnEditCoverimage}) {
  return (
    <button
      className='absolute right-[5%] bottom-[20%] p-2 bg-white hover:bg-gray-50 
      cursor-pointer rounded-lg font-semibold flex items-center'
      onClick={() => setOnEditCoverimage(true)}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6 mr-1'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
          clipRule='evenodd'
        />
      </svg>
      <span>Chỉnh sửa ảnh bìa</span>
    </button>
  )
}

export default BtnEditCoverimage
