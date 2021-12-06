import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {updateProfile} from '../../redux/actions/profileActions'

function EditProfile({setOnEditProfile, ...data}) {
  // const {auth} = useSelector((state) => state)
  const dispatch = useDispatch()
  const {userData, auth} = data

  const [editData, setEditData] = useState({
    firstname: '',
    lastname: '',
    livein: '',
    from: '',
    job: '',
  })

  const {firstname, lastname, livein, from, job} = editData

  useEffect(() => {
    setEditData(auth.user)
  }, [auth.user])

  const handleChange = (e) => {
    const {name, value} = e.target
    setEditData({
      ...editData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProfile({editData, auth}))
  }

  return (
    userData.length > 0 &&
    userData.map((user) => (
      <div key={user._id} className='select-none'>
        <div className='modal fixed inset-0 bg-gray-500 opacity-50 z-10'></div>
        <div
          className='inner w-[32%] bg-[#f0f2f5] h-[85%] shadow-lg absolute top-1/2 -translate-y-1/2 
          -translate-x-1/2 left-1/2 z-10 rounded-lg flex flex-col p-4'
        >
          <div
            className='modal-head flex items-center 
            justify-center relative pb-4 border-b 
          border-gray-300'
          >
            <h3 className='font-bold text-xl'>Chỉnh sửa thông tin cá nhân</h3>
            <div
              className='absolute right-1 top-0 cursor-pointer w-9 h-9 
            bg-gray-200 hover:bg-gray-300 rounded-full flex'
              onClick={() => setOnEditProfile(false)}
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

          <div className='modal-input'>
            <div className='flex items-center py-3'>
              <img
                src={user.avatar}
                alt='avatar'
                className='w-10 h-10 rounded-full mr-2'
              />
              <p className='text-gray-800 font-semibold'>
                {user.firstname} {user.lastname}
              </p>
            </div>

            <label className='form-control flex items-center justify-between mt-4 mb-6 relative'>
              <input
                type='text'
                name='firstname'
                placeholder='Họ'
                className='border-2 rounded-md focus:border-blue-500 
                outline-none py-2.5 px-3 flex-1 w-full text-lg'
                value={firstname}
                onChange={handleChange}
              />
              <span className='min-w-[5%] ml-3 font-semibold absolute right-[5%]'>
                {firstname.length}/10
              </span>
            </label>

            <label className='form-control flex items-center justify-between mb-6 relative'>
              <input
                type='text'
                name='lastname'
                placeholder='Tên'
                className='border-2 rounded-md focus:border-blue-500 
                outline-none py-2.5 px-3 flex-1 w-full text-lg'
                value={lastname}
                onChange={handleChange}
              />
              <span className='min-w-[5%] ml-3 font-semibold absolute right-[5%]'>
                {lastname.length}/10
              </span>
            </label>

            <label className='form-control flex items-center justify-between mb-6'>
              <input
                type='text'
                name='livein'
                placeholder='Sống tại'
                className='border-2 rounded-md focus:border-blue-500 
                outline-none py-2.5 px-3 flex-1 w-full text-lg'
                value={livein}
                onChange={handleChange}
              />
            </label>

            <label className='form-control flex items-center justify-between mb-6'>
              <input
                type='text'
                name='from'
                placeholder='Đến từ'
                className='border-2 rounded-md focus:border-blue-500 
                outline-none py-2.5 px-3 flex-1 w-full text-lg'
                value={from}
                onChange={handleChange}
              />
            </label>

            <label className='form-control flex items-center justify-between mb-8'>
              <input
                type='text'
                id='job'
                name='job'
                placeholder='Nghề nghiệp'
                className='border-2 rounded-md focus:border-blue-500 
                outline-none py-2.5 px-3 flex-1 w-full text-lg'
                value={job}
                onChange={handleChange}
              />
            </label>
          </div>

          <button
            className='bg-blue-500 hover:bg-blue-700 py-2 rounded-md text-white font-semibold'
            onClick={handleSubmit}
          >
            Cập nhật
          </button>
        </div>
      </div>
    ))
  )
}

export default EditProfile
