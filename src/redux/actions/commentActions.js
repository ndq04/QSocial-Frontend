import {
  deleteDataApi,
  patchDataApi,
  postDataApi,
} from '../../utils/fetchDataApi'
import {ACTION_TYPES, DeleteData, EditData} from './actionTypes'

export const createComment =
  ({pos, comment, auth, socket}) =>
  async (dispatch) => {
    const newPost = {...pos, comments: [...pos.comments, comment]}
    try {
      const body = {
        ...comment,
        postId: pos._id,
        postUserId: pos.user._id,
      }
      const res = await postDataApi('comment', body, auth.token)
      socket.emit('createComment', newPost)
      dispatch({
        type: ACTION_TYPES.UPDATE_POST,
        payload: {...pos, comments: [...pos.comments, res.data.newComment]},
      })
      dispatch({
        type: ACTION_TYPES.UPDATE_USERPOST,
        payload: {...pos, comments: [...pos.comments, res.data.newComment]},
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
    dispatch({
      type: ACTION_TYPES.UPDATE_USERPOST,
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

export const likeComment =
  ({comment, pos, auth}) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: [...comment.likes, auth.user._id],
    }
    const newComments = EditData(pos.comments, comment._id, newComment)

    const newPost = {...pos, comments: newComments}

    dispatch({
      type: ACTION_TYPES.UPDATE_POST,
      payload: newPost,
    })

    dispatch({
      type: ACTION_TYPES.UPDATE_USERPOST,
      payload: newPost,
    })

    try {
      await patchDataApi(`comment/${comment._id}/like`, null, auth.token)
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }

export const unLikeComment =
  ({comment, pos, auth}) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    }
    const newComments = EditData(pos.comments, comment._id, newComment)

    const newPost = {...pos, comments: newComments}

    dispatch({
      type: ACTION_TYPES.UPDATE_POST,
      payload: newPost,
    })
    dispatch({
      type: ACTION_TYPES.UPDATE_USERPOST,
      payload: newPost,
    })
    try {
      await patchDataApi(`comment/${comment._id}/unlike`, null, auth.token)
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }

export const deleteComment =
  ({comment, pos, auth, socket}) =>
  async (dispatch) => {
    const deleteArr = [
      ...pos.comments.filter((cm) => cm.reply === comment._id),
      comment,
    ]
    const newPost = {
      ...pos,
      comments: pos.comments.filter(
        (cm) => !deleteArr.find((da) => cm._id === da._id)
      ),
    }
    dispatch({
      type: ACTION_TYPES.UPDATE_POST,
      payload: newPost,
    })
    dispatch({
      type: ACTION_TYPES.UPDATE_USERPOST,
      payload: newPost,
    })

    try {
      deleteArr.forEach((item) => {
        deleteDataApi(`comment/${item._id}`, auth.token)
      })
      socket.emit('deleteComment', newPost)
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      })
    }
  }
