// 封装请求模块
import axios from 'axios'

// create创建axios实例
const requsest = axios.create(
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

requsest.interceptors.request.use(function (config) {
  // 判断config.url前缀，来进行baseUrl的设置
  config.baseURL = getBaseUrl(config.url)
  return config
})

export default requsest
