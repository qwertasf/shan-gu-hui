import { reqGetSearchInfo } from '@/api'
const state = {
  searchdata: {},
}
const mutations = {
  getsearch(state, data) {
    state.searchdata = data
  },
}
const actions = {
  async getsearchinfo({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('getsearch', result.data)
    }
  },
}
//简化仓库中的数据
const getters = {
  attrsList(state) {
    return state.searchdata.attrsList || []
  },
  goodsList(state) {
    return state.searchdata.goodsList || []
  },
  trademarkList(state) {
    return state.searchdata.trademarkList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
