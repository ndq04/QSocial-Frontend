import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ACTION_TYPES} from '../../redux/actions/actionTypes'
import {checkimage} from '../../utils/imageupload'
import {updateAvatar} from './../../redux/actions/profileActions'

function EditAvatar({setOnEditAvatar}) {
  const [avatar, setAvatar] = useState(false)
  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0]
    const error = checkimage(file)
    if (error) {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {error},
      })
    }
    setAvatar(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateAvatar({avatar, auth}))
    setOnEditAvatar()
  }

  return (
    <div className='select-none'>
      <div className='modal fixed inset-0 bg-gray-500 opacity-50 z-10'></div>
      <div
        className='inner w-[40%] bg-[#f0f2f5] h-[90%] shadow-lg absolute top-1/2 -translate-y-1/2 
          -translate-x-1/2 left-1/2 z-10 rounded-lg flex flex-col px-4 pt-4'
      >
        <div
          className='modal-head flex items-center 
            justify-between h-[10%] mb-4'
        >
          <button
            className='bg-blue-500 hover:bg-blue-700 py-2 px-4
              rounded-md text-white font-semibold text-sm'
            onClick={handleSubmit}
          >
            Cập nhật
          </button>
          <h3 className='font-bold text-xl'>Cập nhật ảnh đại diện</h3>
          <div
            className='cursor-pointer w-9 h-9 
            bg-gray-200 hover:bg-gray-300 rounded-full flex'
            onClick={() => setOnEditAvatar(false)}
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

        <div className='modal-image w-full h-[80%] flex rounded-lg'>
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt='avatar'
            className='w-full h-full m-auto object-cover rounded-md'
          />
        </div>

        <div className='modal-upload h-[10%] flex items-center justify-center my-4'>
          <label htmlFor='upload' className='font-semibold w-full'>
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
              onChange={handleChangeAvatar}
              className='hidden'
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default EditAvatar
