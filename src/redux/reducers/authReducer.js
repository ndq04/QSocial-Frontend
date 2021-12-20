import {ACTION_TYPES} from '../actions/actionTypes'

const initialState = {}

const authReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.AUTH:
      return payload
    default:
      return state
  }
}

export default authReducer
