function MessageDisplay({user, msg, auth}) {
  const imageShow = (src) => <img src={src} alt='' className='object-cover' />
  const videoShow = (src) => <video controls src={src} alt='' />
  return (
    <div className={`p-4 flex flex-col ${auth ? 'items-end' : 'items-start'}`}>
      <div className='flex max-w-[50%] items-start'>
        {!auth && (
          <img
            src={user?.avatar}
            alt=''
            className='w-8 h-8 object-cover rounded-full mr-3 flex-shrink-0'
          />
        )}
        <div>
          {msg?.text && (
            <p
              className={`p-2 rounded-2xl ${
                auth ? 'text-white bg-[#0084ff]' : 'text-gray-900 bg-[#e4e6eb]'
              }`}
            >
              {msg.text}
            </p>
          )}
        </div>
      </div>
      <div className='max-w-[50%] grid grid-cols-2 mt-1'>
        {msg.media?.map((item, i) => (
          <div
            key={i}
            className={`w-full flex rounded-lg border border-gray-300 dark:border-0 overflow-hidden ${
              msg.media?.length === 1
                ? 'col-start-2 rounded-b-3xl rounded-l-3xl rounded-tr-none'
                : ''
            }`}
          >
            {item.secure_url.match(/video/i)
              ? videoShow(item.secure_url)
              : imageShow(item.secure_url)}
          </div>
        ))}
      </div>
      <div>
        {msg?.createdAt && (
          <small className='dark:text-gray-300'>{msg.createdAt}</small>
        )}
      </div>
    </div>
  )
}

export default MessageDisplay
