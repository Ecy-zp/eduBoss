// 广告接口
import request from '@/utils/request'

// 获取所有广告列表
export const getAdList = () => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}

// 获取所有广告位
export const getAllSpaces = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

// 根据ID获取广告信息
export const getAdById = id => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: {
      id
    }
  })
}

// 新增或更新广告信息
export const saveOrUpdate = data => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

// 根据Id获取广告位
export const getSpaceById = id => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params: {
      id
    }
  })
}

// 更新广告状态
export const updateStatus = params => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params
  })
}
