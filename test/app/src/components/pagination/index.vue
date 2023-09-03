!<template>
  <div class="pagination">
    <!-- <h1>{{ startAndEnd }}</h1> -->
    <button @click="$emit('nextPage',pageNo - 1)" :disabled="pageNo==1">上一页</button>
    <button @click="$emit('nextPage',1)" v-if="pageNo > 3">1</button>
    <button v-if="pageNo > 4">......</button>
    <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
    <button v-for="item in startAndEnd.end" :key="item" v-if="item>=startAndEnd.start" @click="$emit('nextPage',item)" :class="{active:pageNo == item}">{{ item }}</button>

    <button v-if="totalPage - pageNo > 3">......</button>
    <button v-if="totalPage - pageNo > 2" @click="$emit('nextPage',totalPage)">{{ totalPage }}</button>

    <button @click="$emit('nextPage',pageNo + 1)" :disabled="pageNo==totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'pageCount'],
  computed: {
    totalPage() {
      //计算出数据分成多少页数
      return Math.ceil(this.total / this.pageSize)
    },
    startAndEnd() {
      let start = 0
      let end = 0
      if (this.totalPage < this.pageCount) {
        start = 1
        end = this.totalPage
      } else {
        start = this.pageNo - parseInt(this.pageCount / 2)
        end = this.pageNo + parseInt(this.pageCount / 2)
        if (start < 1) {
          start = 1
          end = this.pageCount
        }
        if (end > this.totalPage) {
          start = this.totalPage - this.pageCount + 1
          end = this.totalPage
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>