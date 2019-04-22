import axios from 'axios'

import { message } from 'antd'

axios.defaults.withCredentials = true
axios.defaults.timeout = 20*1000

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('J_TOKEN');
    if (token) {
      // Bearer是JWT的认证头部信息
      config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const response = error.response
    if (response.status === 401) {
      if (response.data.errorCode == 4001) {
        message.error(response.data.message);
      } else {
        message.error('您的登录信息已失效，请重新登录');
        window.location.href = decodeURI(`${window.location.protocol}//${window.location.host}/login`)
      }
    }
    return Promise.reject(response);
  }
);