import { reqCode, reqRegister, reqlogin, reqUserInfo, reqlogout } from '@/api'

const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  nickname: '',
}
const mutations = {
  GETCODE(state, data) {
    state.code = data
  },
  GETTOKEN(state, token) {
    state.token = token
  },
  GETUSERNAME(state, nickname) {
    state.nickname = nickname
  },
}
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqCode(phone)
    // console.log(result)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'OK'
    } else return new Error('获取验证码失败')
  },
  //注册
  async getRegister({ commit }, obj) {
    let result = await reqRegister(obj)
    // commit('GETCODE', result.data)
    // console.log(result)
    if (result.code == 200) return 'OK'
    else return new Error('注册失败')
  },
  //获取用户名
  async getUserName({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      // console.log(result)s
      commit('GETUSERNAME', result.data.nickName)
      return 'OK'
    } else return new Error('获取失败')
  },
  //登录
  async getlogin({ commit }, obj) {
    let result = await reqlogin(obj)
    // commit('GETCODE', result.data)
    // console.log(result)
    if (result.code == 200) {
      commit('GETTOKEN', result.data.token)
      localStorage.setItem('TOKEN', result.data.token)
      return 'OK'
    } else return new Error('登录失败')
  },
  //reqlogout
  async getlogout({ commit }) {
    let result = await reqlogout()
    if (result.code == 200) {
      commit('GETTOKEN', '')
      commit('GETUSERNAME', '')
      localStorage.setItem('TOKEN', '')
      return 'OK'
    } else return new Error('退出登录失败')
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
