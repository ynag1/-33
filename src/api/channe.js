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
