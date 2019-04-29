import axios from 'axios'
import * as api from './apis'

const insertLink = (params) => {
  let user = localStorage.getItem('user')
  user = JSON.parse(user);
  params.authorName = user.username
  console.log(user)
  params.authorId = user.id
  return axios.post(api.insertLink, {...params})
}

const updateLink = (params) => {
  return axios.post(api.updateLink, {...params})
}

const deleteLink = (id) => {
  return axios.post(api.deleteLink, {id})
}

const getLink = (params) => {
  return axios.post(api.getLink, {...params})
}

const getLinks = (where = {}, limit = 10, current = 1) => {
  return axios.post(api.getLinks, {
    where: where,
    limit: limit,
    current: current
  })
}

export default {
  insertLink,
  updateLink,
  deleteLink,
  getLink,
  getLinks
}