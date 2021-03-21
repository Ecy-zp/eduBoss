// 资源接口
import request from '@/utils/request'

// 按条件分页查询资源接口
export const getResourcecPage = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 查询资源分类接口
export const getResourcecCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
