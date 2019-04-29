import axios from 'axios'
import * as api from './apis'

const insertArticle = (params) => {
  let user = localStorage.getItem('user')
  user = JSON.parse(user);
  params.authorName = user.username
  params.authorId = user.id
  return axios.post(api.insertArticle, {...params})
}

const updateArticle = (params) => {
  return axios.post(api.updateArticle, {...params})
}

const deleteArticle = (id) => {
  return axios.post(api.deleteArticle, {id})
}

const getArticle = (params) => {
  return axios.post(api.getArticle, {...params})
}

const getArticles = (where = {}, limit = 10, current = 1) => {
  return axios.post(api.getArticles, {
    where: where,
    limit: limit,
    current: current
  })
}

export default {
  insertArticle,
  updateArticle,
  deleteArticle,
  getArticle,
  getArticles
}