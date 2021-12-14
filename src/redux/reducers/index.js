import {combineReducers} from 'redux'
import {alertReducer} from './alertReducer'
import {authReducer} from './authReducer'
import {detailPostReducer} from './detailPostReducer'
import {postReducer} from './postReducer'
import {profileReducer} from './profileReducer'
import {statusReducer} from './statusReducer'

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  status: statusReducer,
  profile: profileReducer,
  homePost: postReducer,
  detailPost: detailPostReducer,
})
