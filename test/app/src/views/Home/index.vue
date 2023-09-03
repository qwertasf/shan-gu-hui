<template>
  <div>
    <typenav></typenav>
    <list></list>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floors" :key="item.id" :list="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import typenav from '@/components/typenav'
import list from '@/views/Home/list'
import Recommend from '@/views/Home/recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/like'
import Floor from '@/views/Home/floor'
import Brand from '@/views/Home/Brand'
import { mapState } from 'vuex'

export default {
  components: {
    typenav,
    list,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('getfloors')
  },
  computed: {
    ...mapState({
      floors: state => state.home.getfloors
    })
  }
}
</script>

<style>
</style>