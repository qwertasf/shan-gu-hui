import { reqtrade, reqaddress, reqOrder, reqOrderList } from '@/api'
import { reqOrderStatus, reqmyOrder } from '@/api'

const state = {
  tradeList: {},
  addressList: [],
  tradeNo: '',
  orderMessage: {},
  myorder: {},
}
const mutations = {
  TRADELIST(state, list) {
    state.tradeList = list
  },
  ADDRESSLIST(state, address) {
    state.addressList = address
  },
  GETORDERNO(state, tradeNo) {
    state.tradeNo = tradeNo
  },
  GETORDERNOLIST(state, data) {
    state.orderMessage = data
  },
  GETMYORDERNO(state, myorder) {
    state.myorder = myorder
  },
}
const actions = {
  async getTrade({ commit }) {
    let result = await reqtrade()
    // console.log(result)
    if (result.code == 200) {
      commit('TRADELIST', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  },
  async getAddress({ commit }) {
    let result = await reqaddress()
    // console.log(result)
    if (result.code == 200) {
      commit('ADDRESSLIST', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  },
  async getOrder({ commit }, { tradeNo, data }) {
    let result = await reqOrder(tradeNo, data)
    // console.log(result)
    if (result.code == 200) {
      commit('GETORDERNO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  },
  //获取订单支付信息 获取支付二维码等信息
  async getOrderList({ commit }, tradeNo) {
    let result = await reqOrderList(tradeNo)
    // console.log(result)
    if (result.code == 200) {
      commit('GETORDERNOLIST', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  },
  //获取订单支付状态
  async getOrderStatus({ commit }, tradeNo) {
    let result = await reqOrderStatus(tradeNo)
    // console.log(result)
    //200 是支付成功的状态 205表示支付失败  这里为了测试，则将服务器返回的状态判断改为205
    if (result.code == 205) {
      return result
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  },
  //获取我的订单信息
  async getmyOrder({ commit }, { page, limit }) {
    // console.log(page, limit)
    let result = await reqmyOrder(page, limit)
    // console.log(result)
    if (result.code == 200) {
      commit('GETMYORDERNO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  },
}
//计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
