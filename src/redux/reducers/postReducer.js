import {ACTION_TYPES} from '../actions/actionTypes'

const initialState = {
  post: [],
}

export const postReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.CREATE_POST:
      return {
        ...state,
        post: [...state.post, payload],
      }
    default:
      return state
  }
}
