<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="entershow" @mouseleave="leaveshow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <!-- 过渡动画的使用 -->
          <div class="sort" v-show="showlist">
            <div class="all-sort-list2" @click="gosearch">
              <div class="item" v-for="item1 in categoryList" :key="item1.categoryId">
                <h3>
                  <a :data-categoryName="item1.categoryName" :data-category1Id="item1.categoryId">{{ item1.categoryName }}</a>
                </h3>
                <div class="item-list">
                  <div class="subitem" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="item2.categoryName" :data-category2Id="item2.categoryId">{{ item2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                          <a :data-categoryName="item3.categoryName" :data-category3Id="item3.categoryId">{{ item3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'typenav',
  data() {
    return {
      showlist: true //三级列表隐藏参数
    }
  },
  // namespaced: true,
  mounted() {
    //通知vuex发请求，获取数据，存储于仓库中
    // this.$store.dispatch('cateoryList')
    //已经在vue.app中mountedz()中执行一次获取到了相应数据存储在vuex中了
    //不会多次获取数据，性能的优化

    //隐藏search中的三级列表
    if (this.$route.path != '/home') {
      this.showlist = false
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    gosearch(event) {
      //用于三级列表跳转search模块的方法
      // this.$router.push('/search')
      //使用categoryName来判断是否点击了a标签category?id来判断是哪一级的id
      let { categoryname, category1id, category2id, category3id } = event.target.dataset
      if (categoryname) {
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        if (this.$route.params.keyword) {
          location.params = this.$route.params
        }
        location.query = query
        // console.log(location)
        this.$router.push(location)
      }
    },
    entershow() {
      this.showlist = true
    },
    leaveshow() {
      //隐藏search中的三级列表,但是首页不隐藏
      if (this.$route.path != '/home') {
        this.showlist = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover {
          //添加鼠标悬浮就显示背景颜色
          background-color: skyblue;
        }
      }
    }

    //过渡动画的样式
    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.5s linear;
    } //过渡动画的样式
  }
}
</style>