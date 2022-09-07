// user.js 划分是跟后端接口文档
import request from '@/utils/request'
/**
 *
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 发送验证码
export const sendCodeAPI = (mobile) => {
  return request({
    // eslint-disable-next-line no-template-curly-in-string
    url: '/v1_0/sms/codes/${mobile}'
  })
}
