<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  mounted() {
    //通知vuex发请求，获取数据，存储于仓库中
    //获取三级列表的数据，在这里只执行一次获取存储在vuex中
    //后续三级列表数据需要的时候直接在vuex中获取就可以了
    this.$store.dispatch('cateoryList')
  }
}
</script>

<style>
</style>