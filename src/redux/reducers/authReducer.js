import {TYPES} from '../actions/authActions'

const initialState = {}

export const authReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case TYPES.AUTH:
      return payload
    default:
      return state
  }
}
