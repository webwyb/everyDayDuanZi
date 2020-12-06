<template>
  <div class="self_container">
    <div v-for="(item, index) in items" :key="index">
      <div :style="{ position: 'absolute', 'z-index': -index}">
        <movable-area v-if="item.isShow" class="movableArea">
          <movable-view class="movableView" direction="horizontal" inertia="true" animation="true" damping="60" friction="100"
            :x="item.x"
            :y="item.y" 
            @change="(e)=>handleMoveView(e, item, index)">
            <div class="cu-card case">
              <div class="cu-item shadow">
                <!--内容信息-->
                <div class='padding-sm'>
                  <div class='radius text-center shadow-blur bg-gradual-green' style="height:580rpx;overflow-y:scroll;">
                    <div class='padding text-white'>
                      <div class='text-lg text-left'>
                        <rich-text :nodes="item.content"></rich-text>
                      </div>
                    </div>
                  </div>
                </div>
                <!--用户信息-->
                <div class="cu-list menu menu-avatar">
                  <div class="cu-item">
                    <!--用户信息-->
                    <image :src="item.creator ? item.creator.avatar : defaultAvatar" class="cu-avatar round lg"
                           mode="aspectFit" lazy-load="true"></image>
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
                        <button open-type="share" :data-id="item._id">
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
          src="https://6475-duanzi-fc5318-1258744718.tcb.qcloud.la/like.png?sign=cce686f421839bd519586c3fad4d4aab&t=1607075071"></image>
        <image :class="[right ? 'active': '', 'self_pic']"
          src="https://6475-duanzi-fc5318-1258744718.tcb.qcloud.la/dislike.png?sign=d98b2c7cf78a6bd83bc5ead2b19a7ec7&t=1607075050"></image>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/index";
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
      pageIndex: 0,   // 当前页数
      pageSize: 10, //页面尺寸
      defaultAvatar: "https://6475-duanzi-fc5318-1258744718.tcb.qcloud.la/like.png",
      defaultNickName: "不愿透漏姓名的段友",
      defaultCreateDate: "2020-12-5",
    };
  },
  mounted() {
    this.getArticle(0);
  },
  onShareAppMessage(res) {
    return {
      title: "每一个段子都值得被尊重",
      path: `pages/tempIndex/main?id=${res.target.dataset._id}`,
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
    /**
     * 处理移动的模块
     *  监听onchang ==> 获取到 x,y(防抖、异步任务)
     *  监听touchend ==> 决定如何处理当前item，取消 or 下一个
     * 
     *  @touchend="handleTouchArea(item,index)"
        @touchcancel='handleTouchArea(item,index)'
     */
    handleMoveView: debounce(async function(e, item, index){
      let self = this;
      self.prex = e.target.x;
      self.prey = e.target.y;
      if (self.prex < -50) {
        item.isShow = false;
        self.handleBottomAnimation('left')
      } else if (self.prex > 50) {
        item.isShow = false;
        self.handleBottomAnimation('right')
      }
      console.log('移动改变的坐标', e, item);
      self.getMoreData(index);
    },200),
    handleTouchArea(e, item, index){
      console.log(e);
      console.log(item, index);
    },
    // 处理底部的动画效果
    handleBottomAnimation(dire){
      let self = this;
      self[dire] = true;
      setTimeout(() => {
        self[dire] = false;
      }, 1000);
    },
    // 获取更多数据
    getMoreData(index) {
      let self = this;
      if ((index+1) % self.pageSize === 0) {
        self.pageIndex = self.pageIndex + 1;
        self.getArticle(self.pageIndex);
      }
      return false;
    },
    // 获取文章
    getArticle(pageIndex) {
      let self = this;
      wx.showLoading({
        title: "加载中"
      });
      wx.cloud.database().collection('articles').skip(pageIndex * self.pageSize).limit(self.pageSize).get({
        success: res => {
          wx.hideLoading();
          let tempArr = [];
          res.data.map(item => {
            let tempItem = Object.assign(item, {
              isShow: true,
              x: 0,
              y: 0
            });
            tempArr.push(tempItem);
          });
          self.items = self.items.concat(tempArr);
        },
        fail: err => {
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
        },
      })
    },
  }
};
</script>

<style scoped>
.self_container {
  margin-top: 50rpx;
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
