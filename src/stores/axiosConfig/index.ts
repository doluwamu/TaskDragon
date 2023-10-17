import axios from 'axios'

const axiosConfig = () => {
  return axios.create({
    baseURL: 'http://localhost:5000/api/v1/'
  })
}

export { axiosConfig }
