import axios from 'axios'

export const getDataApi = async (url, token) => {
  return await axios.get(`/api/${url}`, {
    headers: {Authorization: token},
  })
}

export const postDataApi = async (url, post, token) => {
  return await axios.post(`api/${url}`, post, {
    headers: {Authorization: token},
  })
}

export const putDataApi = async (url, post, token) => {
  return await axios.put(`api/${url}`, post, {
    headers: {Authorization: token},
  })
}

export const patchDataApi = async (url, post, token) => {
  return await axios.patch(`api/${url}`, post, {
    headers: {Authorization: token},
  })
}

export const deleteDataApi = async (url, token) => {
  return await axios.delete(`api/${url}`, {
    headers: {Authorization: token},
  })
}
