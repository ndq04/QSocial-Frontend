import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ACTION_TYPES} from './redux/actions/actionTypes'

function SocketioClient() {
  const {auth, socket} = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.emit('joinUser', auth.user._id)
  }, [socket, auth.user._id])

  useEffect(() => {
    socket.on('likeToClient', (newPost) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_POST,
        payload: newPost,
      })
      dispatch({
        type: ACTION_TYPES.UPDATE_USERPOST,
        payload: newPost,
      })
    })
    return () => socket.off('likeToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('unlikeToClient', (newPost) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_POST,
        payload: newPost,
      })
      dispatch({
        type: ACTION_TYPES.UPDATE_USERPOST,
        payload: newPost,
      })
    })
    return () => socket.off('unlikeToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('createCommentToClient', (newPost) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_POST,
        payload: newPost,
      })
      dispatch({
        type: ACTION_TYPES.UPDATE_USERPOST,
        payload: newPost,
      })
    })
    return () => socket.off('createCommentToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('deleteCommentToClient', (newPost) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_POST,
        payload: newPost,
      })
      dispatch({
        type: ACTION_TYPES.UPDATE_USERPOST,
        payload: newPost,
      })
    })
    return () => socket.off('deleteCommentToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('addfriendToClient', (newUser) => {
      dispatch({
        type: ACTION_TYPES.AUTH,
        payload: {...auth, user: newUser},
      })
    })
    return () => socket.off('addfriendToClient')
  }, [dispatch, socket, auth])

  useEffect(() => {
    socket.on('unfriendToClient', (newUser) => {
      dispatch({
        type: ACTION_TYPES.AUTH,
        payload: {...auth, user: newUser},
      })
    })
    return () => socket.off('unfriendToClient')
  }, [dispatch, socket, auth])

  useEffect(() => {
    socket.on('createNotifyToClient', (msg) => {
      dispatch({
        type: ACTION_TYPES.CREATE_NOTIFIES,
        payload: msg,
      })
    })
    return () => socket.off('createNotifyToClient')
  }, [dispatch, socket])

  // useEffect(() => {
  //   socket.on('removeNotifyToClient', (msg) => {
  //     dispatch({
  //       type: ACTION_TYPES.REMOVE_NOTIFIES,
  //       payload: msg,
  //     })
  //   })
  //   return () => socket.off('removeNotifyToClient')
  // }, [dispatch, socket])

  useEffect(() => {
    socket.on('addMessengerToClient', (msg) => {
      dispatch({
        type: ACTION_TYPES.ADD_MESSENGER,
        payload: msg,
      })
    })
    return () => socket.off('addMessengerToClient')
  }, [dispatch, socket])

  return <></>
}

export default SocketioClient
