import { reqShopCart, reqChecked, reqDelete } from '@/api'
import { USER_ID } from '@/utils/user_id'

const state = {
  shopcartList: [],
  userid: USER_ID(),
}
const mutations = {
  GetShopCart(state, data) {
    state.shopcartList = data
  },
}
const actions = {
  async getShopCart({ commit }) {
    let result = await reqShopCart()
    // console.log(result.data.length)
    if (result.code == 200) {
      commit('GetShopCart', result.data)
    }
  },
  async getDeleteCart({ commit }, skuId) {
    let result = await reqDelete(skuId)
    // console.log(result)
    if (result.code == 200) return 'OK'
    else return new Error('faile')
  },
  //删除选择的购物车商品
  getDelete({ commit, dispatch, getters }) {
    let arr1 = []
    getters.CartInfoList.forEach((item) => {
      if (item.isChecked == 1) {
        let result1 = dispatch('getDeleteCart', item.skuId)
        arr1.push(result1)
      }
      // console.log(result)
    })
    return Promise.all(arr1)
  },
  //商品勾选状态
  async getChecked({ commit }, { skuId, check }) {
    let result = await reqChecked(skuId, check)
    // console.log(result)
    if (result.code == 200) return 'OK'
    else return new Error('faile')
  },
  //商品全选状态
  getAllChecked({ dispatch, getters }, ischecked) {
    let arr = []
    getters.CartInfoList.forEach((item) => {
      let result = dispatch('getChecked', {
        skuId: item.skuId,
        check: ischecked,
      })
      arr.push(result)
      // console.log(result)
    })
    return Promise.all(arr)
  },
}
//计算属性
const getters = {
  CartInfoList(state) {
    // console.log(state.shopcartList[0].cartInfoList)
    let cartInfo = state.shopcartList[0] || {}
    return cartInfo.cartInfoList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
