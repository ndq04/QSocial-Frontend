import Status from './Status'

function Content({handleToggle}) {
  return (
    <div className='content col-span-2 h-[calc(100vh-60px)] py-4 overflow-y-scroll'>
      <Status handleToggle={handleToggle} />
    </div>
  )
}

export default Content
