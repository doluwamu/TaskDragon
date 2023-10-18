import axios from 'axios'
// import {useAuthStore} from '../auth'

// const authStore = useAuthStore()
// const {token} = authStore

type headers = {
  'Content-Type': string
  Authorization?: string
}

axios.defaults.withCredentials = true

const axiosConfig = (headers?: headers) => {
  return !headers
    ? axios.create({
        baseURL: 'http://localhost:5000/api/v1/'
        // withCredentials: true
      })
    : axios.create({
        baseURL: 'http://localhost:5000/api/v1/',
        headers

        // withCredentials: true
      })
}

export { axiosConfig }
