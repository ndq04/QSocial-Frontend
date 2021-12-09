import {combineReducers} from 'redux'
import {authReducer} from './authReducer'
import {alertReducer} from './alertReducer'
import {statusReducer} from './statusReducer'
import {profileReducer} from './profileReducer'
import {postReducer} from './postReducer'

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  status: statusReducer,
  profile: profileReducer,
  homePost: postReducer,
})
