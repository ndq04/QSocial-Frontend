import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ACTION_TYPES} from '../../redux/actions/actionTypes'
import {updateCoverimage} from '../../redux/actions/profileActions'
import {checkimage} from '../../utils/imageupload'

function EditCoverimage({setOnEditCoverimage}) {
  const [coverimage, setCoverimage] = useState(false)
  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleChangeCoverimage = (e) => {
    const file = e.target.files[0]
    const error = checkimage(file)
    if (error) {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {error},
      })
    }
    setCoverimage(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateCoverimage({coverimage, auth}))
    setOnEditCoverimage(false)
  }

  return (
    <div className='select-none'>
      <div className='modal fixed inset-0 bg-gray-500 opacity-50 dark:bg-gray-700 dark:opacity-80 z-30'></div>
      <div
        className='inner w-full sm:w-[80%] bg-[#f0f2f5] sm:h-[90%] h-[80%] shadow-lg absolute top-[50%] -translate-y-1/2 
          -translate-x-1/2 left-1/2 z-30 rounded-lg flex flex-col px-4 pt-4 dark:bg-[#252627]'
      >
        <div
          className='modal-head flex items-center 
            justify-between h-[10%] mb-4'
        >
          <h3 className='font-bold text-xl dark:text-gray-300'>
            Cập nhật ảnh bìa
          </h3>
          <div
            className='cursor-pointer w-9 h-9 
            bg-gray-200 hover:bg-gray-300 rounded-full flex dark:bg-[#464747] dark:hover:bg-[#666768]'
            onClick={() => setOnEditCoverimage(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 m-auto text-gray-500 dark:text-gray-300'
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

        <div className='modal-image w-full h-[60%] sm:h-[80%] flex rounded-lg'>
          <img
            src={
              coverimage
                ? URL.createObjectURL(coverimage)
                : auth.user.coverimage
            }
            alt='coverimage'
            className='w-full h-full m-auto object-cover rounded-md'
          />
        </div>

        <div className='modal-upload h-[20%] sm:h-[10%] flex flex-col sm:flex-row items-center justify-between my-4'>
          <label htmlFor='upload' className='font-semibold flex-1 sm:mr-5'>
            <div
              className='flex items-center justify-center p-2
              rounded-lg bg-green-200 hover:bg-green-300 cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7 text-green-600 mr-3'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-green-600 text-lg'>Tải ảnh lên</span>
            </div>

            <input
              type='file'
              accept='image/*'
              id='upload'
              onChange={handleChangeCoverimage}
              className='hidden'
            />
          </label>
          <button
            className='bg-blue-500 hover:bg-blue-700 py-2 px-4
              rounded-md text-white font-semibold min-w-full sm:min-w-[30%]'
            onClick={handleSubmit}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCoverimage
