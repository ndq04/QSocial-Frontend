import {ACTION_TYPES, EditData} from '../actions/actionTypes'

const initialState = {
  loading: false,
  data: [],
  sound: false,
}

const notifyReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.GET_NOTIFIES:
      return {
        ...state,
        data: payload,
      }
    case ACTION_TYPES.CREATE_NOTIFIES:
      return {
        ...state,
        data: [payload, ...state.data],
      }
    case ACTION_TYPES.REMOVE_NOTIFIES:
      return {
        ...state,
        data: state.data.filter(
          (item) => item.id !== payload.id || item.url !== payload.url
        ),
      }
    case ACTION_TYPES.UPDATE_NOTIFIES:
      return {
        ...state,
        data: EditData(state.data, payload._id, payload),
      }
    case ACTION_TYPES.DELETE_NOTIFIES:
      return {
        ...state,
        data: payload,
      }
    default:
      return state
  }
}

export default notifyReducer
