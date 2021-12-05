import {getDataApi, patchDataApi} from '../../utils/fetchDataApi'
import {imageupload} from '../../utils/imageupload'
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
        dispatch({
          type: ACTION_TYPES.ALERT,
          payload: {
            loading: true,
          },
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
        dispatch({
          type: ACTION_TYPES.ALERT,
          payload: {
            loading: false,
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

export const updateProfile =
  ({editData}) =>
  async (dispatch) => {
    // console.log({editData, avatar})

    if (!editData.firstname) {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {error: 'Họ không được để trống'},
      })
    }
    if (!editData.lastname) {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {error: 'Tên không được để trống'},
      })
    }
    if (editData.firstname.length > 10) {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {error: 'Họ không được vượt quá 10 ký tự'},
      })
    }
    if (editData.lastname.length > 10) {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {error: 'Tên không được vượt quá 10 ký tự'},
      })
    }

    try {
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }

export const updateAvatar =
  ({avatar, auth}) =>
  async (dispatch) => {
    let media
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        loadingImage: true,
      },
    })

    try {
      if (avatar) {
        media = await imageupload([avatar])
      }
      // console.log(media)
      const res = await patchDataApi(
        'useravatar',
        {avatar: avatar ? media[0].secure_url : auth.user.avatar},
        auth.token
      )

      dispatch({
        type: ACTION_TYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            avatar: avatar ? media[0].secure_url : auth.user.avatar,
          },
        },
      })

      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          loadingImage: false,
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
