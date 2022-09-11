// 所有新闻的接口
import request from '@/utils/request'
/**
 * 获取文章
 * id, 频道的id
 * timestamp 请求新的推荐数据传当前的时间戳
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
