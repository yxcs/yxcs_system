import axios from 'axios'
import * as api from './apis'

const login = (params) => {
  return axios.post(api.login, {...params})
}

const register = (params) => {
  return axios.post(api.register, {...params})
}

export default {
  login,
  register
}
