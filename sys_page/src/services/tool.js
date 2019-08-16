import http from './axios.config'
import * as api from './api'

const getBookmarkList = (params) => {
  return http.post(`${api.GETBOOKMARKLIST}`, {...params})
}

export default {
  getBookmarkList
}