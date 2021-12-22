import {getDataApi} from '../../utils/fetchDataApi'
import {ACTION_TYPES} from './actionTypes'

export const AddUser =
  ({user, message}) =>
  async (dispatch) => {
    if (message.users.every((item) => item.id !== user._id)) {
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
      type: ACTION_TYPES.ADD_MESSAGE,
      payload: msg,
    })
    console.log(msg)
    // try {
    //   const res = await postDataApi('message', msg, auth.token)
    //   console.log(res)
    // } catch (error) {
    //   dispatch({
    //     type: ACTION_TYPES.ALERT,
    //     payload: {
    //       error: error.response.data.message,
    //     },
    //   })
    // }
  }

export const getConversations = (auth) => async (dispatch) => {
  try {
    const res = await getDataApi('conversations', auth.token)
    console.log(res)
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        error: error.response.data.message,
      },
    })
  }
}
