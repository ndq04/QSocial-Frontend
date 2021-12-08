import {getDataApi, postDataApi} from '../../utils/fetchDataApi'
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
        payload: res.data.newPost,
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
    const res = await getDataApi('posts', token)
    console.log(res)
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
