<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <div :style="{ position: 'absolute', 'z-index': -index }">
        <movable-area v-if="item.isShow"
                      class="movableArea">
          <movable-view class="movableView"
                        direction="all"
                        inertia="true"
                        animation="false"
                        damping="80"
                        friction="50"
                        :x="item.x"
                        :y="item.y"
                        @change="handleMoveView">
            <!--@click="goDetail(item.id)"-->
            <div class="cu-card case">
              <div class="cu-item shadow">
                <!--内容信息-->
                <div class='padding-sm'
                     @touchend="handleTouchArea(item,index)"
                     @touchcancel='handleTouchArea(item,index)'>
                  <div class='radius text-center shadow-blur bg-gradual-green' style="height:500rpx;overflow-y:scroll;">
                    <div class='padding text-white'>
                      <div class='text-lg text-left'>
                        <wxParse :content="item.content" />
                      </div>
                    </div>
                  </div>
                </div>
                <!--用户信息-->
                <div class="cu-list menu menu-avatar">
                  <div class="cu-item">
                    <!--用户信息-->
                    <div class="cu-avatar round lg"
                         :style="{'background-image':'url(' + 'https://duanzi.fengtianhe.cn/assets/images/avatar.png' + ')'}">
                    </div>
                    <div class='content flex-sub'>
                      <div class='text-grey'>{{nickName}}</div>
                      <div class='text-gray text-sm flex justify-between'>
                        {{createDate}}
                      </div>
                    </div>
                    <!--点赞图标-->
                    <div class="text-gray text-xxl flex-direction-row flex" style="align-items: center">
                      <div @click="giveGood(item)" style="padding-right: 8px">
                        <span class='icon-appreciatefill lg text-gray margin-lr-xs' v-if="item.isLike"></span>
                        <span class="icon-appreciate lg text-gray margin-lr-xs" v-else></span>
                      </div>
                      <!--@click="sharePic(item.id)" -->
                      <!--<div style="padding-right: 3px">-->
                      <!--<button open-type="getUserInfo" lang="zh_CN" @click="onGotUserInfo(item)">-->
                      <!--<span class="icon-pic lg text-gray margin-lr-xs"></span>-->
                      <!--</button>-->
                      <!--</div>-->
                      <!--<div>-->
                      <!--<button open-type="share" :data-id="item.id"><span-->
                      <!--class="icon-share lg text-gray margin-lr-xs"></span></button>-->
                      <!--</div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </movable-view>
        </movable-area>
      </div>
    </div>
  </div>
</template>

<script>
  import wxParse from "mpvue-wxparse";
  export default {
    data() {
      return {
        // x左边的偏移量
        prex: 0,
        // 请求到的数据
        items: [],
        // 当前页数
        page: 0,
        nickName: "不愿透漏姓名的段友",
        createDate: "2019-03-01",
      };
    },
    components: {
      wxParse
    },
    mounted() {
      this.getArticle(this.page);
    },
    methods: {
      handleMoveView(e) {
        let self = this;
        self.prex = e.target.x;
      },
      handleTouchArea(item, index) {
        let self = this;
        console.log(self.prex);
        console.log("====", index);
        // console.log(e);
        if (self.prex < -200 || self.prex > 200) {
          item.isShow = false;
          self.prex = 0;
          console.log("item", item);
          self.getMoreData(index);
        } else {
          item.x = 0;
          item.y = 0;
          self.prex = 0;
        }
      },
      // 获取更多数据
      getMoreData(index) {
        let self = this;
        if ((index % 5) === 4) {
          self.page = self.page + 1;
          self.getArticle(self.page);
        }
      },
      // 获取文章
      getArticle(page) {
        let self = this;
        wx.showLoading({
          title: "加载中"
        });
        self.$http.getRequest("articles", {
          page: page,
          pageSize: 5
        }).then((res) => {
          let tempArr = [];
          res.data.map((item) => {
            let tempItem = Object.assign(item, { isShow: true, x: 0, y: 0 });
            tempArr.push(tempItem);
          });
          self.items = tempArr;
        }).catch((err) => {
          console.log("请求到的苏剧", err);
        }).finally(() => {
          wx.hideLoading();
        });
      },
      // 查看详情
      goDetail(id) {
        wx.navigateTo({ url: `/pages/detail/main?id=${id}` });
      },
    }
  };
</script>

<style scoped>
  .movableArea {
    height: 160vh;
    width: 260vw;
    background: transparent;
    left: -80vw;
    top: -30vh;
  }

  .movableView {
    height: 100vh;
    width: 100vw;
    background: transparent;
    left: 80vw;
    top: 30vh;
  }
</style>
