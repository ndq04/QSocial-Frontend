import {
  deleteDataApi,
  getDataApi,
  patchDataApi,
  postDataApi,
} from '../../utils/fetchDataApi'
import {imageupload} from '../../utils/imageupload'
import {ACTION_TYPES} from './actionTypes'
import {createNotify, removeNotify} from './notifyActions'

export const createPost =
  ({content, images, auth, socket}) =>
  async (dispatch) => {
    try {
      let media = []
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          loadingImage: true,
        },
      })

      if (images.length > 0) {
        media = await imageupload(images)
      }
      const res = await postDataApi(
        'posts',
        {content, images: media},
        auth.token
      )

      dispatch({
        type: ACTION_TYPES.CREATE_POST,
        payload: {...res.data.newPost, user: auth.user},
      })
      dispatch({
        type: ACTION_TYPES.CREATE_USERPOST,
        payload: {...res.data.newPost, user: auth.user},
      })

      // notify
      const msg = {
        id: res.data.newPost._id,
        text: 'đã thêm bài viết mới',
        url: `/post/${res.data.newPost._id}`,
        recipients: res.data.newPost.user.friends,
        content,
        image: media?.length > 0 ? media[0].secure_url : '',
      }
      dispatch(createNotify({msg, auth, socket}))

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

export const getPost = (token) => async (dispatch) => {
  try {
    if (token) {
      dispatch({
        type: ACTION_TYPES.LOADING_POSTS,
        payload: true,
      })
      const res = await getDataApi('posts', token)
      // console.log(res)

      dispatch({
        type: ACTION_TYPES.GET_POSTS,
        payload: res.data,
      })
      dispatch({
        type: ACTION_TYPES.LOADING_POSTS,
        payload: false,
      })
    }
  } catch (error) {
    // console.log(error.response.data.message)
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        error: error.response.data.message,
      },
    })
  }
}

export const getSinglePost =
  ({detailPost, auth, id}) =>
  async (dispatch) => {
    // console.log({detailPost, auth, id})
    if (detailPost.every((item) => item._id !== id)) {
      try {
        const res = await getDataApi(`/post/${id}/singlepost`, auth.token)
        dispatch({
          type: ACTION_TYPES.GET_POST,
          payload: res.data.post,
        })
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  }

export const getUserPost =
  ({id, token}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ACTION_TYPES.LOADING_USERPOSTS,
        payload: true,
      })
      const res = await getDataApi(`post/${id}/userpost`, token)
      // console.log(res)

      dispatch({
        type: ACTION_TYPES.GET_USERPOSTS,
        payload: res.data,
      })
      dispatch({
        type: ACTION_TYPES.LOADING_USERPOSTS,
        payload: false,
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

export const updatePost =
  ({content, images, auth, status, socket}) =>
  async (dispatch) => {
    let media = []
    const newImageUrl = images.filter((image) => !image.secure_url)
    const oldImageUrl = images.filter((image) => image.secure_url)
    if (
      status.content === content &&
      newImageUrl.length === 0 &&
      oldImageUrl.length === status.images.length
    ) {
      return
    }
    try {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          loadingImage: true,
        },
      })
      if (newImageUrl.length > 0) {
        media = await imageupload(newImageUrl)
      }
      const res = await patchDataApi(
        `post/${status._id}`,
        {content, images: [...oldImageUrl, ...media]},
        auth.token
      )
      // console.log(res)
      dispatch({
        type: ACTION_TYPES.UPDATE_POST,
        payload: res.data.updatePost,
      })
      dispatch({
        type: ACTION_TYPES.UPDATE_USERPOST,
        payload: res.data.updatePost,
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

export const savedPost =
  ({pos, auth}) =>
  async (dispatch) => {
    const newUser = {...auth.user, saved: [...auth.user.saved, pos._id]}

    dispatch({
      type: ACTION_TYPES.AUTH,
      payload: {...auth, user: newUser},
    })
    try {
      const res = await patchDataApi(`save/${pos._id}`, null, auth.token)
      console.log(res)

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

export const unsavedPost =
  ({pos, auth}) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== pos._id),
    }

    dispatch({
      type: ACTION_TYPES.AUTH,
      payload: {...auth, user: newUser},
    })
    try {
      const res = await patchDataApi(`unsave/${pos._id}`, null, auth.token)
      console.log(res)

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

export const likepost =
  ({pos, auth, socket}) =>
  async (dispatch) => {
    const newPost = {...pos, likes: [...pos.likes, auth.user]}

    dispatch({
      type: ACTION_TYPES.UPDATE_USERPOST,
      payload: newPost,
    })

    dispatch({
      type: ACTION_TYPES.UPDATE_POST,
      payload: newPost,
    })
    socket.emit('likePost', newPost)
    try {
      await patchDataApi(`post/${pos._id}/like`, null, auth.token)

      // notify
      const msg = {
        id: auth.user._id,
        text: 'đã thích bài viết',
        url: `/post/${pos._id}`,
        recipients: [pos.user._id],
        content: pos.content,
      }
      dispatch(createNotify({msg, auth, socket}))
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }

export const unlikepost =
  ({pos, auth, socket}) =>
  async (dispatch) => {
    const newPost = {
      ...pos,
      likes: pos.likes.filter((like) => like._id !== auth.user._id),
    }

    dispatch({
      type: ACTION_TYPES.UPDATE_USERPOST,
      payload: newPost,
    })

    dispatch({
      type: ACTION_TYPES.UPDATE_POST,
      payload: newPost,
    })
    socket.emit('unlikePost', newPost)
    try {
      await patchDataApi(`post/${pos._id}/unlike`, null, auth.token)

      // notify
      const msg = {
        id: auth.user._id,
        text: 'đã bỏ thích bài viết',
        url: `/post/${pos._id}`,
        recipients: [pos.user._id],
        content: pos.content,
      }
      dispatch(createNotify({msg, auth, socket}))
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }

export const deletePost =
  ({pos, auth, socket}) =>
  async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.DELETE_POST,
      payload: pos,
    })
    dispatch({
      type: ACTION_TYPES.DELETE_USERPOST,
      payload: pos,
    })
    try {
      const res = await deleteDataApi(`/post/${pos._id}`, auth.token)
      // notify
      const msg = {
        id: pos._id,
        text: 'đã thêm bài viết mới',
        url: `/post/${pos._id}`,
      }
      dispatch(removeNotify({msg, auth, socket}))

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
