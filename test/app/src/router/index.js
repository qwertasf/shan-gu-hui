import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '@/store'

const router = new VueRouter({
  routes: [
    {
      path: '/center',
      component: () => import('@/views/Center'),
      meta: { show: true },
      children: [
        {
          path: 'myorder',
          component: () => import('@/views/Center/myOrder'),
        },
        {
          path: 'teamorder',
          component: () => import('@/views/Center/teamOrder'),
        },
        {
          path: '/center',
          redirect: '/center/myorder',
        },
      ],
    },
    {
      path: '/paysuccess',
      component: () => import('@/views/PaySuccess'),
      meta: { show: true },
    },
    {
      path: '/pay',
      component: () => import('@/views/Pay'),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else next(false)
      },
    },
    {
      path: '/trade',
      component: () => import('@/views/Trade'),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else next(false)
      },
    },
    {
      path: '/ShopCart',
      component: () => import('@/views/ShopCart'),
      meta: { show: true },
    },
    {
      path: '/addToCart',
      component: () => import('@/views/AddCartSuccess'),
      meta: { show: true },
    },
    {
      path: '/detail/:skuid',
      component: () => import('@/views/Detail'),
      meta: { show: true },
    },
    {
      path: '/home',
      component: () => import('@/views/Home'),
      meta: { show: true },
    },
    {
      path: '/search/:keyword?',
      component: () => import('@/views/Search'),
      name: 'search',
      meta: { show: true },
    },
    {
      path: '/login',
      component: () => import('@/views/Login'),
      meta: { show: false },
    },
    {
      path: '/register',
      component: () => import('@/views/Register'),
      meta: { show: false },
    },
    {
      path: '/', //路由重定向
      redirect: '/home',
    },
  ],
  //跳转到页面时，跳到最顶端
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  },
})

export default router

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.nickname
  // console.log(token, name)
  if (token) {
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('getUserName')
          next()
        } catch (error) {
          await store.dispatch('getlogout')
          next('/login')
        }
      }
    }
  } else {
    let path = to.path
    if (
      path.indexOf('pay') != -1 ||
      path.indexOf('trade') != -1 ||
      path.indexOf('center') != -1
    ) {
      next('/login?redirect=' + path)
    } else {
      next()
    }
  }
})
