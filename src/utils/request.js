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
  if (url.startwith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

requsest.interceptors.request.use(function (config) {
  // 判断config.url前缀，来进行baseUrl的设置
  config.baseURL = getBaseUrl(config.url)
  console.log(config)
  return config
})

export default requsest
