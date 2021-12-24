import {combineReducers} from 'redux'
import alert from './alertReducer'
import auth from './authReducer'
import detailPost from './detailPostReducer'
import message from './messageReducer'
import notify from './notifyReducer'
import homePost from './postReducer'
import profile from './profileReducer'
import socket from './socketReducer'
import status from './statusReducer'

export default combineReducers({
  auth,
  alert,
  status,
  profile,
  homePost,
  detailPost,
  socket,
  message,
  notify,
})
