import {getDataApi} from '../../utils/fetchDataApi'
import {ACTION_TYPES} from './actionTypes'

export const getProfileUsers =
  ({users, id, auth}) =>
  async (dispatch) => {
    // console.log({users, id, auth})
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({
          type: ACTION_TYPES.LOADING,
          payload: {loading: true},
        })
        const res = await getDataApi(`user/${id}`, auth.token)
        dispatch({
          type: ACTION_TYPES.GET_USER,
          payload: res.data,
        })
        dispatch({
          type: ACTION_TYPES.LOADING,
          payload: {loading: false},
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
