import PhotoCard from './PhotoCard'

function Photos({photos, userData}) {
  return (
    <div className='max-w-6xl m-auto bg-white p-4 rounded-lg my-4 min-h-screen dark:bg-[#282928]'>
      <PhotoCard photos={photos} userData={userData} />
    </div>
  )
}

export default Photos
