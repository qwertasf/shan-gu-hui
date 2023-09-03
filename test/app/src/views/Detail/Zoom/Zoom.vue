<template>
  <div class="spec-preview">
    <img :src="bigObj.imgUrl" />
    <div class="event" @mousemove="handle"></div>
    <div class="big">
      <img :src="bigObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Zoom',
  data() {
    return {
      index: 0
    }
  },
  computed: {
    ...mapGetters(['skuInfo']),
    skuImageList1() {
      return this.skuInfo.skuImageList || []
    },
    bigObj() {
      return this.skuImageList1[this.index] || {}
    }
  },
  mounted() {
    return this.$bus.$on('sendIndex', index => (this.index = index))
  },
  methods: {
    handle(e) {
      let big = this.$refs.big
      let mask = this.$refs.mask
      let left = e.offsetX - mask.offsetWidth / 2
      let top = e.offsetY - mask.offsetHeight / 2
      if (left <= 0) left = 0
      if (left >= mask.offsetWidth) left = mask.offsetWidth
      if (top <= 0) top = 0
      if (top >= mask.offsetHeight) top = mask.offsetHeight
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      big.style.left = -left * 2 + 'px'
      big.style.top = -top * 2 + 'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>