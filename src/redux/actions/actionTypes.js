export const ACTION_TYPES = {
  AUTH: 'AUTH',
  ALERT: 'ALERT',
  STATUS: 'STATUS',
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
  FRIEND: 'FRIEND',
  UNFRIEND: 'UNFRIEND',
  LOADING_POSTS: 'LOADING_POSTS',
  CREATE_POST: 'CREATE_POST',
  CREATE_USERPOST: 'CREATE_USERPOST',
  GET_POSTS: 'GET_POSTS',
  GET_USERPOSTS: 'GET_USERPOSTS',
  UPDATE_POST: 'UPDATE_POST',
  UPDATE_USERPOST: 'UPDATE_USERPOST',
  IMAGES: 'IMAGES',
}

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item))
  return newData
}

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id)
  return newData
}
