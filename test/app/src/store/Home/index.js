import { reqCategoryList } from '@/api'
import { reqGetBannerList } from '@/api'
import { reqGetFloors } from '@/api'

const state = {
  categoryList: [],
  BannerList: [],
  getfloors: [],
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  BannerList(state, bannerlist) {
    state.BannerList = bannerlist
  },
  GetFloors(state, getfloors) {
    state.getfloors = getfloors
  },
}
const actions = {
  async cateoryList({ commit }) {
    let result = await reqCategoryList()
    // console.log(result);
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  async getBannerlist({ commit }) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      commit('BannerList', result.data)
    }
  },
  async getfloors({ commit }) {
    let result = await reqGetFloors()
    if (result.code == 200) {
      commit('GetFloors', result.data)
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
