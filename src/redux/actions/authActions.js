import { BASE_URL } from '../../utils/config'
import {postDataApi} from '../../utils/fetchDataApi'
import {valid} from '../../utils/Valid'
import {ACTION_TYPES} from './actionTypes'

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        loading: true,
      },
    })
    const res = await postDataApi(`${BASE_URL}/login`, data)

    localStorage.setItem('login', true)
    dispatch({
      type: ACTION_TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    })
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        loading: false,
      },
    })
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        success: res.data.message,
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
      const res = await postDataApi(`${BASE_URL}/refresh_token`)
      dispatch({
        type: ACTION_TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      })
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          loading: false,
        },
      })

      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          success: res.data.message,
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
}

export const register = (data) => async (dispatch) => {
  const check = valid(data)
  try {
    if (check.errLength > 0) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: check.errMessage,
      })
    } else {
      const res = await postDataApi(`${BASE_URL}/register`, data)

      localStorage.setItem('login', true)

      dispatch({
        type: ACTION_TYPES.AUTH,
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
    }
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        error: error.response.data.message,
      },
    })
  }
}

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('login')
    await postDataApi(`${BASE_URL}/logout`)
    window.location.href = '/'
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        error: error.response.data.message,
      },
    })
  }
}
