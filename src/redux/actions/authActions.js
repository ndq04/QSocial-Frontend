import {postDataApi} from '../../utils/fetchDataApi'
import {ACTION_TYPES} from './actionTypes'

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        loading: true,
      },
    })
    const res = await postDataApi('login', data)
    // console.log(res)
    dispatch({
      type: ACTION_TYPES.LOGIN,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    })
    localStorage.setItem('login', true)
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        error: error.response.data.message,
      },
    })
  }
}

export const refreshToken = () => async (dispatch) => {
  const login = localStorage.getItem('login')
  if (login) {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        loading: true,
      },
    })
    try {
      const res = await postDataApi('refresh_token')
      // console.log(res)
      dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      })
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          success: res.data.message,
        },
      })
    } catch (error) {
      console.log(error.response.data.message)
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }
}
