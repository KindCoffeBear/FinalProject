import axios from 'axios'
import TOKEN from '../localStorageConsts'

const token = localStorage.getItem(TOKEN)
const axiosInstance = axios.create({
  baseURL: 'https://api.react-learning.ru/',
  headers: { authorization: `Bearer ${token}` },
})
export default axiosInstance
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.request.responseURL === 'https://api.react-learning.ru/signin') {
      axiosInstance.defaults.headers.authorization = `Bearer ${response.data.token}`
    }
    return response
  },
)
