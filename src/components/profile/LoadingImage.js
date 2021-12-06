function LoadingImage() {
  return (
    <div className='fixed w-full h-full bg-white opacity-70 z-20 '>
      <div
        className='flex flex-col items-center absolute left-1/2 
        top-1/2 -translate-x-1/2 -translate-y-1/2'
      >
        <div className='lds-facebook'>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h3 className='font-semibold text-2xl'>Đang tải...</h3>
      </div>
    </div>
  )
}

export default LoadingImage
