import {ACTION_TYPES} from '../actions/actionTypes'

const initialState = {}

const alertReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.ALERT:
      return payload
    default:
      return state
  }
}

export default alertReducer
