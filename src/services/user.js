// 封装请求方法
import request from '@/utils/request'
import qs from 'qs'
// import store from '@/store'

// 用户登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

// 用户基本信息接口
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

// 分页查询用户信息
export const getUserPage = data => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

// 封禁用户
export const forbidUser = userId => {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    params: {
      userId
    }
  })
}

// 启用用户
export const enableUser = userId => {
  return request({
    method: 'GET',
    url: '/boss/user/enableUser',
    params: {
      userId
    }
  })
}

// 获取用户菜单和资源权限列表
export const getUserPermissions = () => {
  return request({
    method: 'GET',
    url: '/boss/permission/getUserPermissions'
  })
}
