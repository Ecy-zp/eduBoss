// 广告位接口
import request from '@/utils/request'

// 新增或者修改广告位
export const saveOrUpdate = data => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}
