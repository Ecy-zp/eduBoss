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

// 获取所有资源
export const getAll = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

// 获取资源
export const getResourceByid = id => {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}

// 保存或者更新资源
export const saveOrUpdate = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
