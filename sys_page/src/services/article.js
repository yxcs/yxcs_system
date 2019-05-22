import http from './axios.config'
import * as api from './api'

const getArticleList = (params) => {
  return http.post(`${api.GETARTICLELIST}`, {...params})
}

const getArticleDetails = (params) => {
  return http.post(`${api.GETARTICLEDetails}`, {...params})
}

export default {
  getArticleList,
  getArticleDetails
}