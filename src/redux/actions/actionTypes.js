export const ACTION_TYPES = {
  AUTH: 'AUTH',
  ALERT: 'ALERT',
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
  FRIEND: 'FRIEND',
  UNFRIEND: 'UNFRIEND',
}

export const EditData = (data, id, post) => {
  return data.map((item) => (item._id === id ? post : item))
}

export const DeleteData = (data, id) => {
  return data.filter((item) => item._id !== id)
}
