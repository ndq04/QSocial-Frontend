import {useContext} from 'react'
import {ProfileContext} from '../../contexts/ProfileContext'

function PhotoCard({photos, userData}) {
  const {handleToggle} = useContext(ProfileContext)
  return (
    <>
      <h3 className='text-xl font-bold flex items-center mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 sm:cursor-pointer text-[#fe2c55]'
          viewBox='0 0 20 20'
          fill='currentColor'
          onClick={() => handleToggle('showAccount')}
        >
          <path
            fillRule='evenodd'
            d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
            clipRule='evenodd'
          />
        </svg>
        <span className='mx-2 text-[#fe2c55]'>Ảnh</span>
        <span className='text-red-500'>{photos.length + 1}</span>
      </h3>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-4'>
        {photos &&
          photos.length > 0 &&
          photos.map((photo, i) => (
            <img
              key={i}
              src={photo[0].secure_url}
              alt=''
              className='rounded-lg w-full h-[250px] object-cover'
            />
          ))}
        <img
          src={userData[0].avatar}
          alt=''
          className='rounded-lg w-full h-[250px] object-cover'
        />
      </div>
    </>
  )
}

export default PhotoCard
