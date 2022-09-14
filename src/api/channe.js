// 关于频道的接口
import request from '@/utils/request'
/**
 * 关于用户自己的频道
 * @returns
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 所有频道
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 * 删除频道
 * @param {*} id 频道的Id
 * @returns Promise
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
/**
 * 新增频道
 * @param {*} id 新增频道的id
 * @param {*} seq 新增频道的索引值
 * @returns Promise
 */
// 每一次调用的时候都会添加一个对象
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
