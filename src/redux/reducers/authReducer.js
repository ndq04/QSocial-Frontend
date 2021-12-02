import {ACTION_TYPES} from '../actions/actionTypes'

const initialState = {}

export const authReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.LOGIN:
      return payload
    default:
      return state
  }
}
