import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://q-social-backend.vercel.app/',
})
export default instance
