import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.react-learning.ru/',
})
export default axiosInstance
