import http from './axios.config'
import * as api from './api'

const getArticleList = (params) => {
  params.where.draft = false
  return http.post(`${api.GETARTICLELIST}`, {...params})
}

const getArticleDetails = (params) => {
  return http.post(`${api.GETARTICLEDetails}`, {...params})
}

export default {
  getArticleList,
  getArticleDetails
}