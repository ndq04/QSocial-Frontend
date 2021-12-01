import {postDataApi} from '../../utils/fetchDataApi'

export const TYPES = {
  AUTH: 'AUTH',
}
export const login = (data) => async (dispatch) => {
  try {
    const res = await postDataApi('login', data)
    console.log(res)
  } catch (error) {
    console.log(error.response.data)
  }
}
