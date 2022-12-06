import { BASE_URL } from '../../utils/config'
import {
  deleteDataApi,
  getDataApi,
  patchDataApi,
  postDataApi,
} from '../../utils/fetchDataApi'
import {ACTION_TYPES} from './actionTypes'

export const createNotify =
  ({msg, auth, socket}) =>
  async (dispatch) => {
    try {
      const res = await postDataApi(`${BASE_URL}/notify`, msg, auth.token)
      socket.emit('createNotify', {
        ...res.data.notify,
        user: {
          firstname: auth.user.firstname,
          lastname: auth.user.lastname,
          avatar: auth.user.avatar,
        },
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

export const removeNotify =
  ({msg, auth, socket}) =>
  async (dispatch) => {
    try {
      await deleteDataApi(`notify/${msg.id}?url=${msg.url}`, auth.token)
      socket.emit('removeNotify', msg)
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }

export const getNotify = (token) => async (dispatch) => {
  try {
    const res = await getDataApi(`${BASE_URL}/notifies`, token)

    dispatch({
      type: ACTION_TYPES.GET_NOTIFIES,
      payload: res.data.notifies,
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

export const readNotify =
  ({nt, auth}) =>
  async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_NOTIFIES,
      payload: {...nt, isRead: true},
    })

    try {
      await patchDataApi(`${BASE_URL}/isreadnotify/${nt._id}`, null, auth.token)
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }

export const deleteAllNotifies = (auth) => async (dispatch) => {
  dispatch({
    type: ACTION_TYPES.DELETE_NOTIFIES,
    payload: [],
  })

  try {
    await deleteDataApi('deleteallnotifies', auth.token)
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        error: error.response.data.message,
      },
    })
  }
}
