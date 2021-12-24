import axios from 'axios'

export const getDataApi = async (url, token) => {
  return await axios.get(`/api/${url}`, {
    headers: {Authorization: token},
  })
}

export const postDataApi = async (url, data, token) => {
  return await axios.post(`/api/${url}`, data, {
    headers: {Authorization: token},
  })
}

export const putDataApi = async (url, data, token) => {
  return await axios.put(`/api/${url}`, data, {
    headers: {Authorization: token},
  })
}

export const patchDataApi = async (url, data, token) => {
  return await axios.patch(`/api/${url}`, data, {
    headers: {Authorization: token},
  })
}

export const deleteDataApi = async (url, token) => {
  return await axios.delete(`/api/${url}`, {
    headers: {Authorization: token},
  })
}
