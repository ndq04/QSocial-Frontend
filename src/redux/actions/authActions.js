import {postDataApi} from '../../utils/fetchDataApi'
import {ACTION_TYPES} from './actionTypes'
import {valid} from '../../utils/Valid'

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

export const register = (data) => async (dispatch) => {
  const check = valid(data)
  try {
    // console.log(check)
    if (check.errLength > 0) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: check.errMessage,
      })
    } else {
      const res = await postDataApi('register', data)
      // console.log(res)

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
    console.log(error.response.data.message)
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
    await postDataApi('logout')
    window.location.href = '/'
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
