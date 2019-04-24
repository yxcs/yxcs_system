import axios from 'axios'
import * as api from './apis'

const insertArticle = (params) => {
  return axios.post(api.insertArticle, {...params})
}

const updateArticle = (params) => {
  return axios.post(api.updateArticle, {...params})
}

const deleteArticle = (params) => {
  return axios.post(api.deleteArticle, {...params})
}

const getArticle = (params) => {
  return axios.post(api.getArticle, {...params})
}

const getArticles = (params) => {
  return axios.post(api.getArticles, {...params})
}

export default {
  insertArticle,
  updateArticle,
  deleteArticle,
  getArticle,
  getArticles
}