import Picker from 'emoji-picker-react'
import {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {StatusContext} from '../../../contexts/StatusContext'
import {ACTION_TYPES} from '../../../redux/actions/actionTypes'
import {createPost, updatePost} from '../../../redux/actions/postActions'

function StatusModal() {
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const {toggleStatusModal} = useContext(StatusContext)
  const [showPicker, setShowPicker] = useState(false)

  const {auth, status, socket} = useSelector((state) => state)
  const dispatch = useDispatch()

  const onEmojiClick = (e, emojiObject) => {
    setContent((prevInput) => prevInput + emojiObject.emoji)
    // setShowPicker(false)
  }
  useEffect(() => {
    if (status.edit) {
      setContent(status.content)
      setImages(status.images)
    }
  }, [status.edit, status.content, status.images])

  const uploadImages = (e) => {
    const files = [...e.target.files]
    let err = ''
    let imagesArr = []
    files.forEach((file) => {
      if (!file) return (err = 'Không tìm thấy tệp')
      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif'
      ) {
        return (err = 'Định dạng không hỗ trợ')
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

  const handleCloseModal = () => {
    dispatch({
      type: ACTION_TYPES.STATUS,
      payload: {
        edit: false,
      },
    })
    toggleStatusModal()
  }

  const handleSubmit = () => {
    if (status.edit) {
      dispatch(updatePost({content, images, auth, status, socket}))
      dispatch({
        type: ACTION_TYPES.STATUS,
        payload: {
          edit: false,
        },
      })
      toggleStatusModal()
    } else {
      dispatch(createPost({content, images, auth, socket}))
      toggleStatusModal()
    }
  }

  return (
    <div className='select-none'>
      <div
        className='modal fixed inset-0 bg-gray-200 opacity-70 dark:bg-gray-700 dark:opacity-80 z-30'
        onClick={() => setShowPicker(false)}
      ></div>
      <div
        className={`inner w-full sm:w-[500px] bg-white shadow-lg absolute top-1/2 -translate-y-1/2 
        -translate-x-1/2 left-1/2 z-30 rounded-lg flex flex-col p-4 dark:bg-[#252627] ${
          images.length > 0 ? 'max-h-[70%] sm:max-h-[80%]' : 'h-[60%]'
        }`}
      >
        <div
          className='modal-head flex items-center justify-center h-[15%] 
          relative pb-4 border-b border-gray-300 text-[#fe2c55]'
          onClick={() => setShowPicker(false)}
        >
          <h3 className='font-bold text-xl'>
            {status.edit ? 'Cập nhật bài viết' : 'Tạo bài viết'}
          </h3>
          <div
            className='absolute right-1 top-0 cursor-pointer p-1
          bg-[#fe2c55] md:hover:bg-red-500 rounded-full flex '
            onClick={handleCloseModal}
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

        <div
          className={`modal-name flex items-center justify-between ${
            images.length > 0 ? 'h-[10%]' : 'h-[15%]'
          }`}
        >
          <div
            className='flex items-center py-2'
            onClick={() => setShowPicker(false)}
          >
            <img
              src={auth.user.avatar}
              alt='avatar'
              className='w-10 h-10 object-cover rounded-full mr-2'
            />
            <p className='text-[#fe2c55] font-semibold'>
              {auth.user.firstname} {auth.user.lastname}
            </p>
          </div>
          <div className='font-semibold text-gray-500 relative flex items-center'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7 text-yellow-500 cursor-pointer mr-1'
                viewBox='0 0 20 20'
                fill='currentColor'
                onClick={() => setShowPicker(!showPicker)}
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            {showPicker && (
              <div className='absolute top-[100%] right-0 z-10'>
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <span className='font-bold text-[#fe2c55]'>{content?.length}</span>
          </div>
        </div>

        <div
          className='modal-text overflow-y-scroll h-[60%] mb-auto dark:rounded-md dark:overflow-hidden'
          onClick={() => setShowPicker(false)}
        >
          <textarea
            className={`w-full outline-none resize-none bg-white text-2xl dark:bg-[#3a3b3c] dark:text-white dark:p-3 ${
              images.length > 0 ? 'h-[110px] text-base mb-3' : 'h-full'
            }`}
            placeholder={`${auth.user.lastname} ơi, bạn đang nghĩ gì thế ?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {images && images.length > 0 && (
            <div
              className={`w-full rounded-lg p-2 grid grid-cols-3 gap-2 ${
                images.length > 0 && 'border border-gray-400'
              }`}
            >
              {images.map((image, index) => (
                <div key={index} className='relative'>
                  <img
                    src={
                      image.secure_url
                        ? image.secure_url
                        : URL.createObjectURL(image)
                    }
                    alt={'image_' + index}
                    className='w-full h-[100px] sm:h-[150px] object-cover rounded-md'
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

        <div
          className='modal-option flex items-center border border-gray-400 rounded-lg 
          pl-3 py-1 my-3 sm:my-4 bg-white h-[15%] dark:bg-[#282928] dark:border-gray-600'
          onClick={() => setShowPicker(false)}
        >
          <p className='font-semibold text-[#fe2c55]'>Thêm ảnh</p>
          <label
            htmlFor='status'
            className='p-2 rounded-full hover:bg-gray-200 cursor-pointer ml-3'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7 text-[#fe2c55]'
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
            className='bg-white py-1 px-3 text-[#fe2c55] border border-[#fe2c55] rounded-md md:cursor-pointer mr-2 ml-auto'
            onClick={handleDiscard}
          >
            Xóa tất cả
          </span>
        </div>

        <button
          className={`py-1.5 rounded-md font-semibold ${
            content.length > 0 || images.length > 0
              ? 'bg-[#fe2c55] md:hover:bg-[#f51a46] text-white'
              : 'bg-gray-200 cursor-not-allowed text-gray-400'
          }`}
          onClick={handleSubmit}
          disabled={content.length > 0 || images.length > 0 ? false : true}
        >
          {status.edit ? 'Cập nhật' : 'Đăng'}
        </button>
      </div>
    </div>
  )
}

export default StatusModal
