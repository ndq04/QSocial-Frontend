import {ACTION_TYPES} from '../actions/actionTypes'

const initialState = {
  users: [],
  data: [],
  loading: false,
  resultUsers: 0,
  resultData: 0,
  page: 0,
  firstLoad: false,
}

const messageReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTION_TYPES.ADD_USER:
      return {
        ...state,
        users: [...state.users, payload],
      }
    case ACTION_TYPES.ADD_MESSENGER:
      return {
        ...state,
        data: [payload, ...state.data],
        users: state.users.map((user) =>
          user._id === payload.recipient || user._id === payload.sender
            ? {...user, text: payload.text, media: payload.media}
            : user
        ),
      }
    case ACTION_TYPES.GET_CONVERSATION:
      return {
        ...state,

        users: payload.newArr,
        resultUsers: payload.result,
        firstLoad: true,
      }
    case ACTION_TYPES.GET_MESSENGER:
      return {
        ...state,
        data: payload.message,
        resultData: payload.result,
      }
    default:
      return state
  }
}

export default messageReducer
