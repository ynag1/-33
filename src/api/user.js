// user.js 划分是跟后端接口文档
import request from '@/utils/request'

// 引入store
// import store from '@/store'
/**
 *登录
 * @param {String} mobile 用户手机
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
/**
 *
 * @param {String} mobile 手机号
 * @returns
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 *获取用户信息
 * @returns Promise
 */

export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

/**
 * 上传图片
 * @param {*} file 裁剪后的图片的file对象
 * @returns
 */
export const uploadPhotoAPI = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
// 封装用户昵称修改请求
/**
 *
 * @param {String| Number} name 用户修改的昵称
 * @returns
 */
export const NicknameModifyAPI = (name) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name
    }
  })
}
/**
 *
 * @param {String} gender 用户的性别 0，男 ，1 女
 * @returns
 */
export const SexModifyAPI = (gender) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      gender
    }
  })
}
/**
 *
 * @param {string} birthday 生日，格式“2018-12-20”
 * @returns
 */
export const BirthdayModifyAPI = (birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      birthday
    }
  })
}
/**
 *
 * @returns 获取用户初始值
 */
export const getUserIProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
/**
 *
 * @returns  关注用户
 */
export const FollowUsersAPI = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}
// 取消关注用户

export const UnfriendAPI = (id) => {
  console.log(id)
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {对象} data 添加评论带的参数
 * @returns
 */
export const AddCommentAPI = (data) => {
  return request({
    url: '/v1_0/comments/',
    method: 'POST',
    data
  })
}
/**
 *
 * @param {Number} id 文章的id
 * @returns
 */
/* eslint-disable */
export const getAllCommentAPI = (type, id, offset) => {
  console.log(offset)
  return request({
    url: '/v1_0/comments/',
    method: 'GET',
    params: {
      type,
      source: id,
      offset,
      limit: 30
    }
  })
}

/**
 *封装收藏文章请求
 * @param {Number} id 文章id
 * @returns
 */
export const AddcollectAPI = (id) => {
  console.log(id)
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}
/**
 * 取消·收藏的请求
 * @param {Number} id 文章的id
 * @returns
 */
export const RemoveCollectAPI = (id) => {
  console.log(id)
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {Number} id 添加点赞的请求
 * @returns
 */
export const ArticlesPraiseAPI = (id) => {
  console.log(id)
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
}
/**
 *
 * @param {Number} id 移除点赞的请求
 * @returns
 */
export const RemoveArticlesPraiseAPI = (id) => {
  console.log(id)
  return request({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
}
