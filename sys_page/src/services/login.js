import http from './axios.config'
import * as api from './api'
import md5 from 'md5'
import * as config from '../config'

const login = (params) => {
  params.password = md5(md5(params.password + config.secret))
  return http.post(`${api.LOGIN}`, {...params})
}

const register = (params) => {
  params.password = md5(md5(params.password + config.secret))
  return http.post(`${api.REGISTER}`, {...params})
}

const getUserById = (params) => {
  return http.get(`${api.GETUSER}`, {params: {...params}})
}

const updateUserById = (id, params) => {
  if (params.password) {
    params.password = md5(md5(params.password + config.secret))
  }
  return http.post(`${api.UPDATEUSER}`, {id, params})
}

export default {
  login,
  register,
  getUserById,
  updateUserById
}