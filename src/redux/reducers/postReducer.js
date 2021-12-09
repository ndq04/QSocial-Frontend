import {ACTION_TYPES, EditData} from '../actions/actionTypes'

const initialState = {
  post: [],
  loading: false,
  result: 0,
  page: 0,
}

export const postReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.CREATE_POST:
      return {
        ...state,
        post: [payload, ...state.post],
      }
    case ACTION_TYPES.LOADING_POSTS:
      return {
        ...state,
        loading: payload,
      }
    case ACTION_TYPES.GET_POSTS:
      return {
        ...state,
        post: payload.posts,
        result: payload.result,
      }
    case ACTION_TYPES.UPDATE_POST:
      return {
        ...state,
        post: EditData(state.post, payload._id, payload),
      }
    // case ACTION_TYPES.IMAGES:
    //   return {
    //     ...state,
    //     images: [...state.images, payload],
    //   }
    default:
      return state
  }
}
