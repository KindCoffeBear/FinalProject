import axios from 'axios'
import TOKEN from '../localStorageConsts'

const token = localStorage.getItem(TOKEN)
const axiosInstance = axios.create({
  baseURL: 'https://api.react-learning.ru/',
  headers: { authorization: `Bearer ${token}` },
})
export default axiosInstance
