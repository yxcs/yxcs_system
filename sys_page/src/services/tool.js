import http from './axios.config'
import * as api from './api'

const getBookmarkList = (params) => {
  params.where.draft = false
  return http.post(`${api.GETBOOKMARKLIST}`, {...params})
}

export default {
  getBookmarkList
}