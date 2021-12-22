import {ACTION_TYPES} from '../actions/actionTypes'

const initialState = {
  users: [],
  data: [],
  loading: false,
  resultUsers: 0,
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
    case ACTION_TYPES.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, payload],
        users: state.users.map((user) =>
          user._id === payload.recipient || user._id === payload.sender
            ? {...user, text: payload.text, media: payload.media}
            : user
        ),
      }
    default:
      return state
  }
}

export default messageReducer
