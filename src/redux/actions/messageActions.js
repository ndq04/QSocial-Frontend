import {getDataApi, postDataApi} from '../../utils/fetchDataApi'
import {ACTION_TYPES} from './actionTypes'

export const AddUser =
  ({user, message}) =>
  async (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({
        type: ACTION_TYPES.ADD_USER,
        payload: user,
      })
    }
  }

export const addMessage =
  ({auth, msg, socket}) =>
  async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.ADD_MESSENGER,
      payload: msg,
    })

    try {
      await postDataApi('message', msg, auth.token)
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }

export const getConversations = (auth) => async (dispatch) => {
  if (auth.token) {
    try {
      const res = await getDataApi('conversations', auth.token)
      let newArr = []
      res.data.conversation.forEach((item) => {
        item.recipients.forEach((re) => {
          if (re._id !== auth.user._id) {
            newArr.push({...re, text: item.text, media: item.media})
          }
        })
      })
      dispatch({
        type: ACTION_TYPES.GET_CONVERSATION,
        payload: {newArr, result: res.data.result},
      })
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }
}

export const getMessages =
  ({auth, id}) =>
  async (dispatch) => {
    try {
      const res = await getDataApi(`message/${id}`, auth.token)
      dispatch({
        type: ACTION_TYPES.GET_MESSENGER,
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }
