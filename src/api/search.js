import request from '@/utils/request'
/**
 *
 * @param {*} q 搜索的关键词
 * @returns Promise
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 * @param {Number} page 分页的页数，非必添，不写默认值1
 *@param {Number}per_page 每一页数据的数量
 *@param {Number}q 搜索关键词
 */

// eslint-disable-next-line camelcase
export const getResultsAPI = (page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
