// 封装请求模块
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from 'vue-router'
import qs from 'qs'

// create创建axios实例
const request = axios.create(
  {
    timeout: 5000
  }
  // baseUrl
  // Headers
)
function getBaseUrl (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求前，进行处理
  // 判断config.url前缀，来进行baseUrl的设置
  config.baseURL = getBaseUrl(config.url)
  // 统一设置 Token信息
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      // currentRouter 就是存储了路由信息的对象
      redirect: router.currentRoute.fullPath
    }
  })
}

// 存储是否正在刷新Token状态
let isRefreshing = false
// 存储因为等待Token刷新而挂起的请求
let requests = []
// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response) {
    // 请求发送成功，接到响应，但状态码为失败
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // 1.无token信息
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 检测是否已经存在刷新Token的请求
      if (isRefreshing) {
        // 将当前失败的请求存储起来
        requests.push(() => {
          // 当前函数调用后，自动发送失败请求
          request(error.config)
        })
        return
      }
      isRefreshing = true
      // 2.Token无效
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // 刷新token 失败
        if (res.data.state !== 1) {
          store.commit('setUser', null)
          // 跳转
          redirectLogin()
          return Promise.reject(error)
        }
        // 刷新成功
        // 存储正确的user
        store.commit('setUser', res.data.content)
        // 重新发送失败请求（根据requests发送所有请求）
        requests.forEach(callback => callback())
        // 发送完毕，清除requests内容
        requests = []
        return request(error.config)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // 请求发送完毕，响应处理完毕，将刷新状态更改为false
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务器端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但未收到响应
    Message.error('请求超时')
  } else {
    Message.error(error.message)
  }
  // 将本次请求的错误对象继续向后抛出，让接受响应的处理函数进行操作
  return Promise.reject(error)
})

export default request
