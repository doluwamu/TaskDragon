import axios from 'axios'
import Cookie from 'js-cookie'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:5000/api/v1/'

// https://taskdragon.onrender.com/api/v1/
// http://localhost:5000/api/v1/

const axiosJwt = axios.create({})

axiosJwt.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      var response = await axios
        .get('auth/refresh', {
          withCredentials: true
        })
        .catch((err) => {
          return Promise.reject(err)
        })
      if (response && response.data) {
        Cookie.set('auth_info', JSON.stringify(response.data.user))
        return axios(error.config)
      } else {
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
  }
)

export { axiosJwt }

export default axios
