import {useSelector, useDispatch} from 'react-redux'
import {ACTION_TYPES} from '../redux/actions/actionTypes'
import Loading from './Loading'
import LoadingImage from './profile/LoadingImage'
import Toast from './Toast'

function Alert() {
  const {alert} = useSelector((state) => state)
  const dispatch = useDispatch()

  const close = () => {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {},
    })
  }
  return (
    <div className='absolute'>
      {alert.loading && <Loading />}
      {alert.loadingImage && <LoadingImage />}
      {alert.error && (
        <Toast
          msg={{title: 'Có lỗi xảy ra', body: alert.error}}
          bgColor='bg-red-500'
          handleShow={close}
        />
      )}
      {alert.success && (
        <Toast
          msg={{title: 'Thành công', body: alert.success}}
          bgColor='bg-green-600'
          handleShow={close}
        />
      )}
    </div>
  )
}

export default Alert
