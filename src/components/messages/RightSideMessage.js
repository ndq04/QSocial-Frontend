import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {ACTION_TYPES} from '../../redux/actions/actionTypes'
import {addMessage, getMessages} from '../../redux/actions/messageActions'
import {imageupload} from '../../utils/imageupload'
import MessageDisplay from './MessageDisplay'
import MessageHeader from './MessageHeader'

function RightSideMessage({messenger}) {
  const [user, setUser] = useState([])
  const [text, setText] = useState('')
  const [media, setMedia] = useState([])
  const [loadMedia, setLoadMedia] = useState(false)
  const dispatch = useDispatch()
  const {id} = useParams()
  const {auth, message, socket} = useSelector((state) => state)

  const msgRef = useRef()
  useEffect(() => {
    if (msgRef) {
      msgRef.current.addEventListener('DOMNodeInserted', (event) => {
        const {currentTarget: target} = event
        target.scroll({
          top: target.scrollHeight,
          behavior: 'smooth',
        })
      })
    }
  }, [])

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        await dispatch(getMessages({auth, id}))
      }
      getMessagesData()
    }
  }, [dispatch, auth, id])

  useEffect(() => {
    const newData = message.users.find((item) => item._id === id)
    if (newData) {
      setUser(newData)
    }
  }, [message.users, id])

  const uploadMedia = (e) => {
    const files = [...e.target.files]
    let err = ''
    let mediaArr = []
    files.forEach((file) => {
      if (!file) return (err = 'Không tìm thấy tệp')
      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif' &&
        file.type !== 'video/mp4'
      ) {
        return (err = 'Định dạng ảnh không hỗ trợ')
      }
      return mediaArr.push(file)
    })
    if (err) {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: err,
        },
      })
    }
    setMedia([...media, ...mediaArr])
  }

  const deleteImage = (index) => {
    const newMediaArr = [...media]
    setMedia(newMediaArr.filter((img, i) => i !== index))
  }

  const imageShow = (src) => (
    <img
      src={src}
      alt=''
      className='w-12 h-12 rounded-lg object-cover border border-gray-300 dark:border-gray-500'
    />
  )
  const videoShow = (src) => (
    <video
      controls
      src={src}
      alt=''
      className='w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-500'
    />
  )

  const handleSend = async (e) => {
    e.preventDefault()
    if (!text.trim() && media.length === 0) return
    setMedia([])
    setText('')
    setLoadMedia(true)
    let mediaArr = []
    if (media.length > 0) {
      mediaArr = await imageupload(media)
    }
    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: mediaArr,
      createdAt: new Date().toISOString(),
    }
    setLoadMedia(false)
    await dispatch(addMessage({auth, msg, socket}))
    if (msgRef.current) {
      msgRef.current.scrollIntoView({behavior: 'smooth', block: 'end'})
    }
  }

  return (
    <div
      className={`${
        messenger ? 'col-span-3' : 'col-span-3 lg:col-span-2 h-full'
      } flex flex-col justify-between overflow-hidden lg:border-r dark:border-gray-600 lg:h-full`}
    >
      <MessageHeader user={user} />
      {loadMedia && (
        <div className='lds-spinner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div
        className='flex-1 overflow-y-scroll flex flex-col-reverse'
        ref={msgRef}
      >
        {message.data.map((msg, i) => (
          <div key={i}>
            {msg.sender !== auth.user._id && (
              <MessageDisplay user={user} msg={msg} />
            )}
            {msg.sender === auth.user._id && (
              <MessageDisplay user={auth.user} msg={msg} auth />
            )}
          </div>
        ))}
      </div>
      <form
        className='message-footer h-[60px] w-full flex-shrink-0 flex items-center justify-center relative'
        onSubmit={handleSend}
      >
        <label
          htmlFor='imageUpload'
          className='absolute left-0 translate-x-[50%] md:cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-blue-500'
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
            type='file'
            name=''
            id='imageUpload'
            multiple
            accept='image/*, video/*'
            onChange={uploadMedia}
            hidden
          />
        </label>
        <input
          type='text'
          placeholder='Aa'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`w-[80%] px-4 py-2 border-none outline-none text-[17px] bg-[#f0f2f5] 
          dark:bg-[#3a3b3c] dark:text-gray-300 ${
            media.length > 0 ? 'rounded-b-3xl' : 'rounded-full'
          }`}
        />
        <div
          className='absolute right-0 translate-x-[-50%] md:cursor-pointer'
          onClick={handleSend}
        >
          <svg
            className='h-7 w-7 text-blue-500'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='22' y1='2' x2='11' y2='13' />{' '}
            <polygon points='22 2 15 22 11 13 2 9 22 2' />
          </svg>
        </div>
        {media.length > 0 && (
          <div
            className='absolute p-3 rounded-t-3xl w-[80%] h-[200%] bottom-[calc(100%-10px)] bg-[#f0f2f5] 
            grid grid-cols-8 gap-2 overflow-scroll dark:bg-[#3a3b3c]'
          >
            {media.length > 0 &&
              media.map((item, i) => (
                <div key={i} className='relative'>
                  {item.type.match(/video/i)
                    ? videoShow(URL.createObjectURL(item))
                    : imageShow(URL.createObjectURL(item))}
                  <span
                    className='group absolute p-0.5 rounded-full border border-gray-400 dark:border-gray-600 sm:cursor-pointer top-0 right-0 
                    translate-x-[20%] translate-y-[-20%] bg-white dark:bg-[#3a3b3c] hover:bg-red-500 hover:border-red-500 dark:hover:bg-red-500'
                    onClick={() => deleteImage(i)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 text-gray-800 dark:text-gray-300 group-hover:text-white'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                </div>
              ))}
          </div>
        )}
      </form>
    </div>
  )
}

export default RightSideMessage
