import axios from 'axios'
import * as api from './apis'
import md5 from 'md5'
import config from '../config'

const login = (params) => {
  params.password = md5(md5(params.password + config.secret))
  return axios.post(api.login, {...params})
}

const register = (params) => {
  params.password = md5(md5(params.password + config.secret))
  return axios.post(api.register, {...params})
}

const addMenu = (params) => {
  params.type = 1;
  return axios.post(api.addMenu, {...params})
}

const getMenu = (params) => {
  return axios.get(api.getMenu, {params})
}

const updateMenu = (params) => {
  params.params.type = 1;
  return axios.post(api.updateMenu, {...params})
}

const deleteMenu = (id) => {
  return axios.post(api.deleteMenu, {id})
}

const getUser = (id) => {
  return axios.post(api.getUser, {id})
}

export default {
  login,
  register,
  addMenu,
  getMenu,
  deleteMenu,
  updateMenu,
  getUser
}
