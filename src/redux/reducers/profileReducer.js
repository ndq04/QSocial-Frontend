import {ACTION_TYPES} from '../actions/actionTypes'

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
    default:
      return state
  }
}
