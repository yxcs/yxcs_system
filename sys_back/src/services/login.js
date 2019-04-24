import axios from 'axios'
import * as api from './apis'

const login = (params) => {
  return axios.post(api.login, {...params})
}

const register = (params) => {
  return axios.post(api.register, {...params})
}

const addMenu = (params) => {
  params.type = 1;
  return axios.post(api.addMenu, {...params})
}

const getMenu = () => {
  return axios.get(api.getMenu, {})
}

const updateMenu = (params) => {
  params.params.type = 1;
  return axios.post(api.updateMenu, {...params})
}

const deleteMenu = (id) => {
  return axios.post(api.deleteMenu, {id})
}

export default {
  login,
  register,
  addMenu,
  getMenu,
  deleteMenu,
  updateMenu
}
