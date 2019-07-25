import axios from 'axios'
import * as api from './apis'


const parseParam = (param) => {
  const curParam = {}
  for (let key in param) {
    if (param[key] !== '' && param[key] !== null && param[key] !== undefined) {
      if (typeof param[key] === 'object') {
        if (param[key] instanceof Array) {
          if (param[key].length > 0) {
            curParam[key] = param[key]
          }
        } else if (JSON.stringify(param[key]) !== '{}') {
          curParam[key] = param[key]
        }
      } else {
        curParam[key] = param[key]
      }
    }
  }
  return curParam
}

const insertPro = (params) => {
  const paramsFormat = parseParam(params)
  return axios.post(api.insertPro, {...paramsFormat})
}

const updatePro = (params) => {
  const paramsFormat = parseParam(params)
  return axios.post(api.updatePro, {...paramsFormat})
}

const deletePro = (id) => {
  return axios.post(api.deletePro, {id})
}

const getProById = (params) => {
  const paramsFormat = parseParam(params)
  return axios.post(api.getProById, {...paramsFormat})
}

const getProList = (where = {}, limit = 10, current = 1) => {
  let params = {
    where: where,
    limit: limit,
    current: current
  }
  params = parseParam(params)
  return axios.post(api.getProList, params)
}

const insertFlow = (params) => {
  const paramsFormat = parseParam(params)
  return axios.post(api.insertFlow, {...paramsFormat})
}

const updateFlow = (params) => {
  const paramsFormat = parseParam(params)
  return axios.post(api.updateFlow, {...paramsFormat})
}

const dealFlow = (params) => {
  const paramsFormat = parseParam(params)
  return axios.post(api.dealFlow, {...paramsFormat})
}

const deleteFlow = (id) => {
  return axios.post(api.deleteFlow, {id})
}

const getFlowById = (params) => {
  const paramsFormat = parseParam(params)
  return axios.post(api.getFlowById, {...paramsFormat})
}

const getFlowByProId = (where = {}) => {
  const paramsFormat = parseParam(where)
  return axios.post(api.getFlowByProId, {paramsFormat})
}

const getFlowList = (where = {}, limit = 10, current = 1) => {
  let params = {
    where: where,
    limit: limit,
    current: current
  }
  params = parseParam(params)
  return axios.post(api.getFlowList, params)
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
  getFlowList,
  getFlowByProId,
  dealFlow
}