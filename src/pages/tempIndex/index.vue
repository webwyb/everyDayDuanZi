<template>
  <div class="self_container">
    <div v-for="(item, index) in items" :key="index">
      <div :style="{ position: 'absolute', 'z-index': -index }">
        <movable-area v-if="item.isShow"
                      class="movableArea">
          <movable-view class="movableView"
                        direction="all"
                        inertia="true"
                        animation="true"
                        damping="60"
                        friction="100"
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
                  <div class='radius text-center shadow-blur bg-gradual-green' style="height:600rpx;overflow-y:scroll;">
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
                    <image
                      :src="item.creator ? item.creator.avatar : defaultAvatar"
                      class="cu-avatar round lg"
                      mode="aspectFit"
                      lazy-load="true">
                    </image>
                    <div class='content flex-sub'>
                      <div class='text-grey'>{{item.creator ? item.creator.nickname : defaultNickName}}</div>
                      <div class='text-gray text-sm flex justify-between'>
                        {{item.created_at ? item.created_at : defaultCreateDate}}
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
    <!--底部图片-->
    <div class="page__ft">
      <div style="display: flex;flex-direction: row;justify-content: space-around">
        <image :class="[left ? 'active' : '', 'self_pic']" src="../../../static/images/笑脸.png"/>
        <image :class="[right ? 'active': '', 'self_pic']" src="../../../static/images/哭脸2.png"/>
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
        left: false,
        right: false,
        // 请求到的数据
        items: [
          {
            id: "1",
            index: 1,
            content: "1111",
            isShow: true,
            x: 0,
            y: 0,
            creator: { nickName: "wuyanbin", avatar: "https://duanzi.fengtianhe.cn/assets/images/avatar.png" },
            created_at: "2018-12-12"
          },
          {
            id: "1",
            index: 1,
            content: "1111",
            isShow: true,
            x: 0,
            y: 0,
            creator: { nickName: "wuyanbin", avatar: "https://duanzi.fengtianhe.cn/assets/images/avatar.png" },
            created_at: "2018-12-12"
          },
          {
            id: "1",
            index: 1,
            content: "1111",
            isShow: true,
            x: 0,
            y: 0,
            creator: { nickName: "wuyanbin", avatar: "https://duanzi.fengtianhe.cn/assets/images/avatar.png" },
            created_at: "2018-12-12"
          },
          {
            id: "2",
            index: 2,
            content: "2222",
            isShow: true,
            x: 0,
            y: 0
            // creator: { nickName: "wuyanbin", avatar: "https://duanzi.fengtianhe.cn/assets/images/avatar.png" },
            // created_at: "2018-12-12"
          }
        ],
        // 当前页数
        page: 0,
        defaultAvatar: "https://duanzi.fengtianhe.cn/assets/images/avatar.png",
        defaultNickName: "不愿透漏姓名的段友",
        defaultCreateDate: "2019-3-15"
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
        if (self.prex < -100) {
          item.isShow = false;
          self.left = true;
          self.prex = 0;
          setTimeout(() => {
            self.left = false;
          }, 1000);
          console.log("item", item);
          self.getMoreData(index);
        } else if (self.prex > 100) {
          item.isShow = false;
          self.right = true;
          self.prex = 0;
          setTimeout(() => {
            self.right = false;
          }, 1000);
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
      }
    }
  };
</script>

<style scoped>
  .self_container{
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
  }
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

  .active {
    animation: active 1s ease;
  }

  @keyframes active {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1.0);
    }
  }

  .page__ft {
    position: fixed;
    bottom: 100rpx;
    width: 100vw;
  }

  .self_pic {
    width: 100rpx;
    height: 100rpx;
  }
</style>
