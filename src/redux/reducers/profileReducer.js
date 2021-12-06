import {ACTION_TYPES, EditData} from '../actions/actionTypes'

const initialState = {
  loading: false,
  users: [],
  posts: [],
}

export const profileReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: payload,
      }
    case ACTION_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, payload.user],
      }
    case ACTION_TYPES.FRIEND:
      return {
        ...state,
        users: EditData(state.users, payload._id, payload),
      }
    case ACTION_TYPES.UNFRIEND:
      return {
        ...state,
        users: EditData(state.users, payload._id, payload),
      }
    default:
      return state
  }
}
