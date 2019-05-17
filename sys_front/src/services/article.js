import http from './axios.config'
import * as api from './api'

const getArticleList = (params) => {
  return http.post(`${api.GETARTICLELIST}`, {...params})
}

export default {
  getArticleList
}