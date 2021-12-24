import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom/cjs/react-router-dom.min'

function InfoUserMessage() {
  const [user, setUser] = useState([])
  const {message} = useSelector((state) => state)
  const {id} = useParams()

  useEffect(() => {
    const newData = message.users.find((item) => item._id === id)
    if (newData) {
      setUser(newData)
    }
  }, [message.users, id])
  return (
    <div className='col-span-1 flex justify-center w-full'>
      <div className='flex flex-col items-center mt-5'>
        <img
          src={user?.avatar || 'https://i.imgur.com/iDuSx6e.png'}
          alt='avatar'
          className='w-20 h-20 object-cover rounded-full flex-shrink-0 mb-2 border-2 border-gray-100 dark:border-gray-500'
        />

        <p className='font-semibold dark:text-gray-300'>
          {user?.firstname} {user?.lastname}
        </p>
      </div>
    </div>
  )
}

export default InfoUserMessage
