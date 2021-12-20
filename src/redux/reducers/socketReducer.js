import {ACTION_TYPES} from '../actions/actionTypes'

const socketReducer = (state = [], action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.SOCKET:
      return payload
    default:
      return state
  }
}

export default socketReducer
