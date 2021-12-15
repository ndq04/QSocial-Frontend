import {
  deleteDataApi,
  getDataApi,
  patchDataApi,
  postDataApi,
} from '../../utils/fetchDataApi'
import {imageupload} from '../../utils/imageupload'
import {ACTION_TYPES} from './actionTypes'

export const createPost =
  ({content, images, auth}) =>
  async (dispatch) => {
    // console.log({content, images, auth})
    let media = []
    try {
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
        {content, images: media, user: auth.user._id},
        auth.token
      )
      // console.log(res)
      dispatch({
        type: ACTION_TYPES.CREATE_POST,
        payload: {...res.data.newPost, user: auth.user},
      })
      dispatch({
        type: ACTION_TYPES.CREATE_USERPOST,
        payload: {...res.data.newPost, user: auth.user},
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
        console.log(res)
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
  ({content, images, auth, status}) =>
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
  ({pos, auth}) =>
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

    try {
      await patchDataApi(`post/${pos._id}/like`, null, auth.token)
      // dispatch({
      //   type: ACTION_TYPES.ALERT,
      //   payload: {
      //     success: res.data.message,
      //   },
      // })
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
  ({pos, auth}) =>
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

    try {
      await patchDataApi(`post/${pos._id}/unlike`, null, auth.token)
      // dispatch({
      //   type: ACTION_TYPES.ALERT,
      //   payload: {
      //     success: res.data.message,
      //   },
      // })
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
  ({pos, auth}) =>
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
