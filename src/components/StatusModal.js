import {useContext, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StatusContext} from '../contexts/StatusContext'
import {ACTION_TYPES} from '../redux/actions/actionTypes'
import {createPost} from '../redux/actions/postActions'

function StatusModal() {
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const {handleToggle} = useContext(StatusContext)

  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()

  const uploadImages = (e) => {
    const files = [...e.target.files]
    let err
    let imagesArr = []
    files.forEach((file) => {
      if (!file) return (err = 'Không tìm thấy tệp')
      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif'
      ) {
        return (err = 'Định dạng ảnh không hỗ trợ')
      }
      return imagesArr.push(file)
    })
    if (err) {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: err,
        },
      })
    }
    setImages([...images, ...imagesArr])
  }

  const deleteImage = (index) => {
    const newImagesArr = [...images]
    setImages(newImagesArr.filter((img, i) => i !== index))
  }

  const handleDiscard = () => {
    setContent('')
    setImages([])
  }

  const handleSubmit = async () => {
    await dispatch(createPost({content, images, auth}))
    handleToggle()
  }

  return (
    <div className='select-none'>
      <div className='modal fixed inset-0 bg-gray-500 opacity-50 z-10'></div>
      <div
        className='inner w-[500px] bg-white h-[80%] shadow-lg absolute top-1/2 -translate-y-1/2 
        -translate-x-1/2 left-1/2 z-10 rounded-lg flex flex-col p-4'
      >
        <div className='modal-head flex items-center justify-center h-[10%] relative pb-4 border-b border-gray-300'>
          <h3 className='font-bold text-xl'>Tạo bài viết</h3>
          <div
            className='absolute right-1 top-0 cursor-pointer p-1.5 
          bg-red-500 hover:bg-red-600 rounded-full flex '
            onClick={handleToggle}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 m-auto text-white'
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

        <div className='modal-name flex items-center justify-between h-[10%]'>
          <div className='flex items-center py-2'>
            <img
              src={auth.user.avatar}
              alt='avatar'
              className='w-10 h-10 rounded-full mr-2'
            />
            <p className='text-gray-800 font-semibold'>
              {auth.user.firstname} {auth.user.lastname}
            </p>
          </div>
          <p className='font-semibold text-gray-500'>
            <span className='font-bold text-blue-700'>{content?.length}</span>
          </p>
        </div>

        <div className='modal-text overflow-y-scroll h-[60%] mb-auto'>
          <textarea
            className={`w-full h-full outline-none resize-none bg-white text-2xl ${
              images.length > 0 && 'h-[22%] text-base mb-3'
            }`}
            placeholder={`${auth.user.lastname} ơi, bạn đang nghĩ gì thế ?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {images && images.length > 0 && (
            <div
              className={`w-full rounded-lg p-2 ${
                images.length > 0 && 'border border-gray-400 min-h-[70%]'
              }`}
            >
              {images.map((image, index) => (
                <div key={index} className='relative'>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={'image_' + index}
                    className='w-full h-[250px] object-cover rounded-md'
                  />
                  <p
                    className='absolute right-2 top-2 p-1 rounded-full cursor-pointer
                  bg-red-400 text-white'
                    onClick={() => deleteImage(index)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='modal-option flex items-center border border-gray-400 rounded-lg p-3 my-4 bg-white h-[10%]'>
          <p className='font-semibold text-gray-600'>Thêm ảnh/video</p>
          <label
            htmlFor='status'
            className='p-2 rounded-full hover:bg-gray-200 cursor-pointer ml-3'
          >
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
            <input
              hidden
              type='file'
              id='status'
              multiple
              accept='image/*'
              onChange={uploadImages}
            />
          </label>
          <span
            className='bg-red-500 hover:bg-red-600 py-1 px-3 text-white rounded-md cursor-pointer mr-2 ml-auto'
            onClick={handleDiscard}
          >
            Xóa tất cả
          </span>
        </div>

        <button
          className={`py-1.5 rounded-md font-semibold ${
            content.length > 0 || images.length > 0
              ? 'bg-blue-500 hover:bg-blue-700 text-white'
              : 'bg-gray-200 cursor-not-allowed text-gray-400'
          }`}
          onClick={handleSubmit}
          disabled={content.length > 0 || images.length > 0 ? false : true}
        >
          Đăng
        </button>
      </div>
    </div>
  )
}

export default StatusModal
