import axios from 'axios'
// 超时时间
axios.defaults.timeout = 5000
import { Loading, Message } from 'element-ui'
import router from '../router/index'

var loadinginstace
axios.interceptors.request.use(
  config => {
    loadinginstace = Loading.service({ fullscreen: true })
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    loadinginstace.close()
    Message.error({
      essage: '加载超时'
    })
    return Promise.reject(err);
  });

axios.interceptors.response.use(
  response => {
    loadinginstace.close()
    return response;
  },
  error => {
    loadinginstace.close()
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Message.error({
            message: error.response.data.message
          })
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          if (router.currentRoute.path !== '/login') {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }
          break ;
        default: 
           // do someting
      }
    }
    return Promise.reject(error.response.data)
  });

export default axios
