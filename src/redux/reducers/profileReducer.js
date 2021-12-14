import {ACTION_TYPES, EditData} from '../actions/actionTypes'

const initialState = {
  loading: false,
  users: [],
  posts: [],
  ids: [],
  userposts: [],
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
        users: [...state.users, payload],
      }
    case ACTION_TYPES.GET_IDS:
      return {
        ...state,
        ids: [...state.ids, payload],
      }
    case ACTION_TYPES.USERPOSTS:
      return {
        ...state,
        userposts: [...state.userposts, payload],
      }
    case ACTION_TYPES.FRIEND:
      return {
        ...state,
        users: EditData(state.users, payload._id, payload),
      }
    // return payload
    case ACTION_TYPES.UNFRIEND:
      return {
        ...state,
        users: EditData(state.users, payload._id, payload),
      }
    default:
      return state
  }
}
