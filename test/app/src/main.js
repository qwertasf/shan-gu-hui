import Vue from 'vue'
import App from './App.vue'

import store from '@/store'
//全局组件注册
import typenav from '@/components/typenav'
Vue.component(typenav.name, typenav)

Vue.config.productionTip = false

import { MessageBox, Message } from 'element-ui'
Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$msgbox = MessageBox

//表单验证
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文 message
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: {
    // 给校验的 field 属性名映射中文名称
    phone: '手机号',
    code1: '验证码',
    password: '密码',
    password1: '确认密码',
    check: '协议',
  },
})
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('Check', {
  validate: (value) => {
    return value
  },
  getMessage: (field) => field + '必须同意',
})

//引入图片懒加载
import kenan from '@/assets/R-C.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  loading: kenan,
})

//引入mock数据
import Mock from '@/mock/mockServer'
//引入swiper样式
import 'swiper/css/swiper.css'
//引入分页器
import Pagination from '@/components/pagination'
Vue.component(Pagination.name, Pagination)
//引入路由
import router from '@/router'
//测试接口
// import {reqCategoryList} from '@/api'
// reqCategoryList();

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //注册bus为全局组件供组件之间的通信
    Vue.prototype.$bus = this
  },
  router,
  store,
}).$mount('#app')
