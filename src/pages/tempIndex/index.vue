<template>
  <div class="self_container">
    <div v-for="(item, index) in items" :key="index">
      <div :style="{ position: 'absolute', 'z-index': -index }">
        <movable-area v-if="item.isShow" class="movableArea">
          <movable-view class="movableView" direction="all" inertia="true" animation="true" damping="60" friction="100"
            :x="item.x" :y="item.y" @change="handleMoveView">
            <div class="cu-card case">
              <div class="cu-item shadow">
                <!--内容信息-->
                <div class='padding-sm' @touchend="handleTouchArea(item,index)"
                  @touchcancel='handleTouchArea(item,index)'>
                  <div class='radius text-center shadow-blur bg-gradual-green' style="height:580rpx;overflow-y:scroll;">
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
                    <image :src="item.creator ? item.creator.avatar : defaultAvatar" class="cu-avatar round lg"
                      mode="aspectFit" lazy-load="true" />
                    <div class='content flex-sub'>
                      <div class='text-grey'>{{item.creator ? item.creator.nickname : defaultNickName}}</div>
                      <div class='text-gray text-sm flex justify-between'>
                        {{item.created_at ? item.created_at : defaultCreateDate}}
                      </div>
                    </div>
                    <!--点赞图标-->
                    <div class="text-gray text-xxl flex-direction-row flex" style="align-items: center">
                      <!--<div @click="giveGood(item)" style="padding-right: 8px">-->
                      <!--<span class='icon-appreciatefill lg text-gray margin-lr-xs' v-if="item.isLike"></span>-->
                      <!--<span class="icon-appreciate lg text-gray margin-lr-xs" v-else></span>-->
                      <!--</div>-->
                      <!--@click="sharePic(item.id)" -->
                      <!--<div style="padding-right: 3px">-->
                      <!--<button open-type="getUserInfo" lang="zh_CN" @click="onGotUserInfo(item)">-->
                      <!--<span class="icon-pic lg text-gray margin-lr-xs"></span>-->
                      <!--</button>-->
                      <!--</div>-->
                      <div>
                        <button open-type="share" :data-id="item.id">
                          <span class="icon-share lg text-gray margin-lr-xs"></span>
                        </button>
                      </div>
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
        <image :class="[left ? 'active' : '', 'self_pic']"
          src="https://dev.duanzi.fengtianhe.cn/assets/images/like.png"></image>
        <image :class="[right ? 'active': '', 'self_pic']"
          src="https://dev.duanzi.fengtianhe.cn/assets/images/dislike.png"></image>
      </div>
    </div>
  </div>
</template>

<script>
import wxParse from "mpvue-wxparse";

export default {
  data() {
    return {
      //x轴的偏移量
      prex: 0,
      //y轴的偏移量
      prey: 0,
      left: false,
      right: false,
      // 请求到的数据
      items: [],
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
    this.wxlogin().then(() => {
      console.log("登录成功");
    });
  },
  onShareAppMessage(res) {
    // wx.showLoading({
    //   title: "加载中"
    // });
    return {
      title: "每一个段子都值得被尊重",
      path: `pages/tempIndex/main?id=${res.target.dataset.id}`,
      success: function(res) {
        // 转发成功
        // wx.hideLoading()
        console.log("成功", res);
      },
      fail: function(res) {
        // 转发失败
        // wx.hideLoading()
        console.log("失败", res);
      }
    };
  },
  methods: {
    handleMoveView(e) {
      let self = this;
      self.prex = e.target.x;
      self.prey = e.target.y;
    },
    handleTouchArea(item, index) {
      let self = this;
      console.log("x", self.prex);
      console.log("y", self.prey);
      console.log("====", index);
      // console.log(e);
      if (self.prex < -50 || self.prey < -50) {
        item.isShow = false;
        self.left = true;
        self.prex = 0;
        self.giveGoodOrHate(item, 1);
        setTimeout(() => {
          self.left = false;
        }, 1000);
        console.log("item", item);
        console.log("index", index);
        self.getMoreData(index);
      } else if (self.prex > 50 || self.prey > 50) {
        item.isShow = false;
        self.right = true;
        self.prex = 0;
        self.giveGoodOrHate(item, 2);
        setTimeout(() => {
          self.right = false;
        }, 1000);
        console.log("item", item);
        console.log("index", index);
        self.getMoreData(index);
      } else {
        item.x = 0;
        item.y = 0;
        self.prex = 0;
        self.prey = 0;
      }
    },
    // 获取更多数据
    getMoreData(index) {
      let self = this;
      if (index % 5 === 2) {
        self.page = self.page + 1;
        self.getArticle(self.page);
      }
    },
    // 获取文章
    getArticle(page) {
      let self = this;
      // wx.showLoading({
      //   title: "加载中"
      // });
      self.$http
        .getRequest("articles", {
          page: page,
          pageSize: 5
        })
        .then(res => {
          let tempArr = [];
          res.data.map(item => {
            let tempItem = Object.assign(item, {
              isShow: true,
              x: 0,
              y: 0
            });
            tempArr.push(tempItem);
          });
          this.items = this.items.concat(tempArr);
        })
        .catch(err => {
          console.log("请求到的苏剧", err);
        })
        .finally(() => {
          // wx.hideLoading();
        });
    },
    // 点赞 or 踩 1:点赞 2:点踩
    giveGoodOrHate(item, type) {
      let self = this;
      if (!item.isLike) {
        self.$http
          .postRequest(`articles/like/${item.id}`, {
            type: type
          })
          .then(() => {
            item.isLike = true;
          });
      } else {
        console.log("已经喜欢了");
      }
    },
    // 登录
    async wxlogin() {
      let self = this;
      await wx.login({
        success(res) {
          if (res.code) {
            wx.showLoading({
              title: "一大波段子来袭"
            });
            // 发起网络请求
            self.$http
              .getRequest("users/login", {
                code: res.code
              })
              .then(res => {
                wx.hideLoading();
                mpvue.setStorageSync("token", res.data.token);
                self.getArticle(self.page);
              });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.self_container {
  margin-top: 10rpx;
  display: flex;
  flex-direction: column;
}

.movableArea {
  height: 150vh;
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
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}

.page__ft {
  position: fixed;
  bottom: 50rpx;
  width: 100vw;
}

.self_pic {
  width: 100rpx;
  height: 100rpx;
}
</style>
