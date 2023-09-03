import requests from './requests.js'
//api统一管理
export const reqCategoryList = () => {
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

import mockajax from './mockajax'
//轮播图数据
export const reqGetBannerList = () => {
  return mockajax.get('/banners')
}
//家用电器和手机通讯数据
export const reqGetFloors = () => {
  return mockajax.get('/floors')
}

//搜索组件的数据
export const reqGetSearchInfo = (params) => {
  return requests({
    url: '/list',
    method: 'post',
    data: params,
  })
}
//商品详情数据
export const reqGoodInfo = (skuid) => {
  return requests({
    url: `/item/${skuid}`,
    method: 'get',
  })
}
//添加到购物车
export const reqAddCartSuccess = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  })
}
//获取购物车信息
export const reqShopCart = () => {
  return requests({
    url: '/cart/cartList',
    method: 'get',
  })
}
//删除购物车信息
export const reqDelete = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
  })
}

//修改商品状态
export const reqChecked = (skuID, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: 'get',
  })
}

//获取验证码 /api/user/passport/sendCode/{phone}
export const reqCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
  })
}

//注册  /user/passport/register  method:post
export const reqRegister = (data) => {
  return requests({
    url: '/user/passport/register',
    method: 'post',
    data,
  })
}

//登录
export const reqlogin = (data) => {
  return requests({
    url: '/user/passport/login',
    method: 'post',
    data,
  })
}

//获取用户登录成功以后用户信息的接口
export const reqUserInfo = () => {
  return requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
  })
}

//退出登录
export const reqlogout = () => {
  return requests({
    url: '/user/passport/logout',
    method: 'get',
  })
}

//获取交易订单信息 /order/auth/trade
export const reqtrade = () => {
  return requests({
    url: '/order/auth/trade',
    method: 'get',
  })
}

//获取地址 /api/user/userAddress/auth/findUserAddressList
export const reqaddress = () => {
  return requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get',
  })
}

//获取订单号
export const reqOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data,
  })
}

//获取订单信息 /payment/weixin/createNative/{orderId}
export const reqOrderList = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get',
  })
}

//获取订单的支付状态
export const reqOrderStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get',
  })
}

//获取我的订单信息    /order/auth/{page}/{limit} get
export const reqmyOrder = (page, limit) => {
  return requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get',
  })
}
