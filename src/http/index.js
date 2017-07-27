/**
 * Created by 陈振华 on 2017/7/4.
 */
import axios from 'axios'
import { getUserInfo, clearUserInfo } from '@/static/js/Common'
import router from '../router'
import Vue from 'vue'

axios.defaults.baseURL = 'http://192.168.30.100/backend_adv/v1'
axios.defaults.timeout = 5000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use(function (config) {
  if (!(router.currentRoute.fullPath === '/' || router.currentRoute.fullPath === '/login')) {
    if (!getUserInfo('token')) {
      router.push('/login')
      return
    }
    config.data.token = getUserInfo('token')
    // config.data.account = getUserInfo('account')
    return config
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  // console.log(res)
  switch (Number(res.data.rescode)) {
    case 401:
      // alert('error info!')
      if (!(router.currentRoute.fullPath === '/' || router.currentRoute.fullPath === '/login')) {
        clearUserInfo('token')
        router.push('/login')
      } else {
        alert(res.data.errInfo)
      }
      break
    case 200:
      return res
    default:
      alert(res.data.errInfo)
  }
}, function (error) {
  return Promise.reject(error)
})
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios

export default axios
