import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://q-social.onrender.com/',
})
export default instance
