import {ACTION_TYPES, EditData} from '../actions/actionTypes'

export const detailPostReducer = (state = [], action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.GET_POST:
      return [...state, payload]
    case ACTION_TYPES.UPDATE_POST:
      return EditData(state, payload._id, payload)
    default:
      return state
  }
}
