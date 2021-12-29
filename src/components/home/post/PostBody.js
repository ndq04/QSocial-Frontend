import {useState} from 'react'
function PostBody({pos}) {
  const [readMore, setReadMore] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = (nextImage) => {
    setCurrentImage(
      currentImage === nextImage.length - 1 ? 0 : currentImage + 1
    )
  }
  const previousImage = (prevImage) => {
    setCurrentImage(
      currentImage === 0 ? prevImage.length - 1 : currentImage - 1
    )
  }

  return (
    <div className='post-PostBody w-full'>
      <div className='max-w-full px-3 text-sm text-gray-800 dark:text-gray-300'>
        {pos.content.length < 200
          ? pos.content
          : readMore
          ? pos.content
          : pos.content.slice(0, 200)}
        <span>
          {pos.content.length > 200 && (
            <span
              className='font-semibold cursor-pointer hover:underline dark:text-gray-400'
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? ' Ẩn bớt' : '... Xem thêm'}
            </span>
          )}
        </span>
      </div>
      <div className='mt-3 relative group'>
        {pos.images.length > 1 && currentImage >= 1 && (
          <span
            className='absolute top-[50%] -translate-y-1/2 left-2 p-1.5 
            bg-white cursor-pointer rounded-full hidden group-hover:block'
            onClick={() => previousImage(pos.images)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        )}
        {pos.images.length > 1 && currentImage < pos.images.length - 1 && (
          <span
            className='absolute top-[50%] -translate-y-1/2 right-2 p-1.5 
            bg-white cursor-pointer rounded-full hidden group-hover:block'
            onClick={() => nextImage(pos.images)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        )}
        <div>
          {pos.images.length > 0 &&
            pos.images.map((image, index) =>
              index === currentImage ? (
                <img
                  key={image.public_id}
                  src={image.secure_url}
                  alt=''
                  className='w-full object-cover block'
                />
              ) : (
                <img
                  key={image.public_id}
                  src={image.secure_url}
                  alt=''
                  className='hidden'
                />
              )
            )}
        </div>
      </div>
    </div>
  )
}

export default PostBody
