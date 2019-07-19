import axios from 'axios'
import * as api from './apis'

const insertPro = (params) => {
  return axios.post(api.insertPro, {...params})
}

const updatePro = (params) => {
  return axios.post(api.updatePro, {...params})
}

const deletePro = (id) => {
  return axios.post(api.deletePro, {id})
}

const getProById = (params) => {
  return axios.get(api.getProById, {params: {...params}})
}

const getProList = (where = {}, limit = 10, current = 1) => {
  return axios.get(api.getProList, {
    params: {
      where: where,
      limit: limit,
      current: current
    }
  })
}

const insertFlow = (params) => {
  return axios.post(api.insertFlow, {...params})
}

const updateFlow = (params) => {
  return axios.post(api.updateFlow, {...params})
}

const deleteFlow = (id) => {
  return axios.post(api.deleteFlow, {id})
}

const getFlowById = (params) => {
  return axios.get(api.getFlowById, {params: {...params}})
}

const getFlowList = (where = {}, limit = 10, current = 1) => {
  return axios.get(api.getFlowList, {
    params: {
      where: where,
      limit: limit,
      current: current
    }
  })
}

export default {
  insertPro,
  updatePro,
  deletePro,
  getProById,
  getProList,

  insertFlow,
  updateFlow,
  deleteFlow,
  getFlowById,
  getFlowList
}