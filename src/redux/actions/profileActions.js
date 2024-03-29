import { BASE_URL } from '../../utils/config'
import {getDataApi, patchDataApi} from '../../utils/fetchDataApi'
import {imageupload} from '../../utils/imageupload'
import {ACTION_TYPES, DeleteData} from './actionTypes'
import {createNotify} from './notifyActions'

export const getProfileUsers =
  ({users, id, auth}) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({type: ACTION_TYPES.GET_IDS, payload: id})
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
        const user = await getDataApi(`${BASE_URL}/user/${id}`, auth.token)
        const posts = await getDataApi(`${BASE_URL}/post/${id}/userpost`, auth.token)

        dispatch({
          type: ACTION_TYPES.GET_USER,
          payload: user.data.user,
        })
        dispatch({
          type: ACTION_TYPES.USERPOSTS,
          payload: {...posts.data.posts, _id: id, result: posts.data.result},
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
        console.log(error.response.data.message)
        // dispatch({
        //   type: ACTION_TYPES.ALERT,
        //   payload: {
        //     error: error.response.data.message,
        //   },
        // })
      }
    }
  }

export const updateProfile =
  ({editData, auth}) =>
  async (dispatch) => {
    try {
      const {firstname, lastname, livein, from, job} = editData

      if (!firstname) {
        return dispatch({
          type: ACTION_TYPES.ALERT,
          payload: {
            error: 'Họ không được để trống',
          },
        })
      }
      if (firstname.length > 10) {
        return dispatch({
          type: ACTION_TYPES.ALERT,
          payload: {
            error: 'Họ không được vượt quá 10 ký tự',
          },
        })
      }
      if (!lastname) {
        return dispatch({
          type: ACTION_TYPES.ALERT,
          payload: {
            error: 'Tên không được để trống',
          },
        })
      }
      if (lastname.length > 10) {
        return dispatch({
          type: ACTION_TYPES.ALERT,
          payload: {
            error: 'Tên không được vượt quá 10 ký tự',
          },
        })
      }

      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          loadingImage: true,
        },
      })
      const res = await patchDataApi(
        `${BASE_URL}/userprofile`,
        {
          firstname,
          lastname,
          livein,
          from,
          job,
          userId: auth.user._id,
        },
        auth.token
      )

      dispatch({
        type: ACTION_TYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...editData,
            firstname,
            lastname,
            livein,
            from,
            job,
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

export const updateAvatar =
  ({avatar, auth}) =>
  async (dispatch) => {
    try {
      let media
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          loadingImage: true,
        },
      })

      if (avatar) {
        media = await imageupload([avatar])
      }

      const res = await patchDataApi(
        `${BASE_URL}/useravatar`,
        {
          avatar: avatar ? media[0].secure_url : auth.user.avatar,
          userId: auth.user._id,
        },
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

export const updateCoverimage =
  ({coverimage, auth}) =>
  async (dispatch) => {
    try {
      let media
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          loadingImage: true,
        },
      })

      if (coverimage) {
        media = await imageupload([coverimage])
      }

      const res = await patchDataApi(
        `${BASE_URL}/usercoverimage`,
        {
          coverimage: coverimage ? media[0].secure_url : auth.user.coverimage,
          userId: auth.user._id,
        },
        auth.token
      )

      dispatch({
        type: ACTION_TYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            coverimage: coverimage ? media[0].secure_url : auth.user.coverimage,
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

export const addfriend =
  ({users, user, auth, socket}) =>
  async (dispatch) => {
    const newUser = {
      ...user,
      friends: [...user.friends, auth.user],
    }

    dispatch({
      type: ACTION_TYPES.FRIEND,
      payload: newUser,
    })
    dispatch({
      type: ACTION_TYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          followings: [...auth.user.followings, newUser],
        },
      },
    })
    try {
      const res = await patchDataApi(
        `${BASE_URL}/user/${user._id}/friend`,
        {_id: auth.user._id},
        auth.token
      )
      socket.emit('addfriend', res.data.newUser)

      // notify
      const msg = {
        id: auth.user._id,
        text: 'đã bắt đầu theo dõi bạn',
        url: `/profile/${auth.user._id}`,
        recipients: [newUser._id],
      }
      dispatch(createNotify({msg, auth, socket}))

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

export const unfriend =
  ({users, user, auth, socket}) =>
  async (dispatch) => {
    const newUser = {
      ...user,
      friends: DeleteData(user.friends, auth.user._id),
    }

    dispatch({
      type: ACTION_TYPES.UNFRIEND,
      payload: newUser,
    })

    dispatch({
      type: ACTION_TYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          followings: DeleteData(auth.user.followings, newUser._id),
        },
      },
    })
    try {
      const res = await patchDataApi(
        `${BASE_URL}/user/${user._id}/unfriend`,
        {_id: auth.user._id},
        auth.token
      )
      socket.emit('unfriend', res.data.newUser)

      // notify
      const msg = {
        id: auth.user._id,
        text: 'đã bỏ theo dõi bạn',
        url: `/profile/${auth.user._id}`,
        recipients: [newUser._id],
      }
      dispatch(createNotify({msg, auth, socket}))

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
