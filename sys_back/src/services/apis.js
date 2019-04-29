import config from '../config'

export const login = `${config.apiHost}/api/login`
export const register = `${config.apiHost}/api/register`
export const addMenu = `${config.apiHost}/api/insertMenu`
export const getMenu = `${config.apiHost}/api/getMenu`
export const updateMenu = `${config.apiHost}/api/updateMenu`
export const deleteMenu = `${config.apiHost}/api/deleteMenu`

// blog相关
export const insertArticle = `${config.apiHost}/api/insertArticle`
export const updateArticle = `${config.apiHost}/api/updateArticle`
export const deleteArticle = `${config.apiHost}/api/deleteArticle`
export const getArticle = `${config.apiHost}/api/getArticle`
export const getArticles = `${config.apiHost}/api/getArticles`

// blog相关
export const insertLink = `${config.apiHost}/api/insertLink`
export const updateLink = `${config.apiHost}/api/updateLink`
export const deleteLink = `${config.apiHost}/api/deleteLink`
export const getLink = `${config.apiHost}/api/getLink`
export const getLinks = `${config.apiHost}/api/getLinks`