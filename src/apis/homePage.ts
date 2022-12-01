import request from '../utils/request'

export const apiGetHomePageTopic = function (params) {
  return request({
    url: '/topics',
    method: 'get',
    params: params
  })
}