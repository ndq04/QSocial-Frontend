import {patchDataApi, postDataApi} from '../../utils/fetchDataApi'
import {ACTION_TYPES, EditData} from './actionTypes'

export const createComment =
  ({pos, comment, auth}) =>
  async (dispatch) => {
    const newPost = {...pos, comments: [...pos.comments, comment]}
    dispatch({
      type: ACTION_TYPES.UPDATE_POST,
      payload: newPost,
    })
    try {
      const data = {...comment, postId: pos._id}
      await postDataApi('comment', data, auth.token)
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }

export const updateComment =
  ({comment, content, pos, auth}) =>
  async (dispatch) => {
    const newComment = EditData(pos.comments, comment._id, {
      ...comment,
      content,
    })

    dispatch({
      type: ACTION_TYPES.UPDATE_POST,
      payload: newComment,
    })
    try {
      await patchDataApi(`comment/${comment._id}`, {content}, auth.token)
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }
