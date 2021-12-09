import {ACTION_TYPES} from '../actions/actionTypes'

export const statusReducer = (state = false, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.STATUS:
      return payload
    default:
      return state
  }
}
