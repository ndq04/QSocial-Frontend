import axios from 'axios'

export const getDataApi = async (url, token) => {
  return await axios.get(url, {
    headers: {Authorization: token},
  })
}

export const postDataApi = async (url, data, token) => {
  return await axios.post(url, data, {
    headers: {Authorization: token},
  })
}

export const putDataApi = async (url, data, token) => {
  return await axios.put(url, data, {
    headers: {Authorization: token},
  })
}

export const patchDataApi = async (url, data, token) => {
  return await axios.patch(url, data, {
    headers: {Authorization: token},
  })
}

export const deleteDataApi = async (url, token) => {
  return await axios.delete(url, {
    headers: {Authorization: token},
  })
}
