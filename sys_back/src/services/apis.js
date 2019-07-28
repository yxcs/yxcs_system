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

// 用户相关
export const getUsers = `${config.apiHost}/api/getUsers`
export const getUser = `${config.apiHost}/api/getUser`
export const updateUser = `${config.apiHost}/api/updateUser`

// 工具相关
export const insertPro = `${config.apiHost}/tool/insertPro`
export const updatePro = `${config.apiHost}/tool/updatePro`
export const deletePro = `${config.apiHost}/tool/deletePro`
export const getProById = `${config.apiHost}/tool/getProById`
export const getProList = `${config.apiHost}/tool/getProList`
export const insertFlow = `${config.apiHost}/tool/insertFlow`
export const updateFlow = `${config.apiHost}/tool/updateFlow`
export const deleteFlow = `${config.apiHost}/tool/deleteFlow`
export const getFlowById = `${config.apiHost}/tool/getFlowById`
export const getFlowList = `${config.apiHost}/tool/getFlowList`
export const getFlowByProId = `${config.apiHost}/tool/getFlowByProId`
export const dealFlow = `${config.apiHost}/tool/dealFlow`
export const finishFlow = `${config.apiHost}/tool/finishFlow`
export const cancelPro = `${config.apiHost}/tool/cancelPro`
export const delayPro = `${config.apiHost}/tool/delayPro`
