import { reqAddCartSuccess, reqGoodInfo, reqDelete } from '@/api'
const state = {
  getGood: {},
}
const mutations = {
  getgood(state, data) {
    state.getGood = data
  },
}
const actions = {
  async getgoodinfo({ commit }, skuid = {}) {
    let result = await reqGoodInfo(skuid)
    if (result.code == 200) {
      commit('getgood', result.data)
    }
  },
  async getCartSuccess({ commit }, { skuId, skuNum }) {
    let result = await reqAddCartSuccess(skuId, skuNum)
    // console.log(result)
    if (result.code == 200) return 'OK'
    else return new Error('faile')
  },
}
//简化仓库中的数据
const getters = {
  categoryView(state) {
    return state.getGood.categoryView || {}
  },
  skuInfo(state) {
    return state.getGood.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.getGood.spuSaleAttrList || {}
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
