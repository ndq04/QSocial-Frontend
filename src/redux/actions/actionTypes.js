export const ACTION_TYPES = {
  AUTH: 'AUTH',
  ALERT: 'ALERT',
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
  FRIEND: 'FRIEND',
  UNFRIEND: 'UNFRIEND',
  CREATE_POST: 'CREATE_POST',
}

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item))
  return newData
}

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id)
  return newData
}
