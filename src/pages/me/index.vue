<template>
  <div>
    <div class='UCenter-bg'>
      <div class="user-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class='text-xl margin-top-xs'>
        <open-data type="userNickName"></open-data>
      </div>
      <image src='https://6475-duanzi-fc5318-1258744718.tcb.qcloud.la/wave.gif' mode='scaleToFill' class='gif-wave'></image>
    </div>
    <!--创作和点赞详情-->
    <div class='padding flex text-center text-grey bg-white shadow-warp'>
      <div class='flex flex-sub flex-direction solid-right'>
        <div class="text-xxl text-orange">
          <AnimatedNumber
            :value="createNum"
            :precision="2"
          >
          </AnimatedNumber>
        </div>
        <div class="margin-top-sm">
          <text class='icon-attentionfill'></text>
          创作
        </div>
      </div>
      <div class='flex flex-sub flex-direction'>
        <div class="text-xxl text-blue">
          <AnimatedNumber
            :value="getGoodNum"
            :precision="2"
          >
          </AnimatedNumber>
        </div>
        <div class="margin-top-sm">
          <text class='icon-favorfill'></text>
          获赞
        </div>
      </div>
    </div>
    <!--链接页面-->
    <div class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
      <div class="cu-item arrow">
        <div class='content' @click="goMyCreate">
          <text class='icon-creativefill text-orange'></text>
          <text class='text-grey'>我的创作</text>
        </div>
      </div>
      <div class="cu-item arrow">
        <div class='content' @click="goToCreate">
          <text class='icon-skinfill text-pink'></text>
          <text class='text-grey'>我要创作</text>
        </div>
      </div>
      <view class="cu-item arrow">
        <div class='content' @click="goPublishLog">
          <text class='icon-formfill text-green'></text>
          <text class='text-grey'>发布日志</text>
        </div>
      </view>
      <view class="cu-item arrow">
        <button class='cu-btn content' open-type='feedback'>
          <text class='icon-writefill text-olive'></text>
          <text class='text-grey'>意见反馈</text>
        </button>
      </view>
      <view class="cu-item arrow">
        <button class='cu-btn content' open-type='contact'>
          <text class='icon-weixin text-cyan'></text>
          <text class='text-grey'>聊骚客服</text>
        </button>
      </view>
      <div class="cu-item arrow">
        <div class='content' @click="goAbout">
          <text class='icon-github text-gray'></text>
          <text class='text-grey'>关于段子hand</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AnimatedNumber from "@gaomd/mpvue-animated-number";

  export default {
    name: "index",
    data() {
      return {
        createNum: 666,
        getGoodNum: 666
      };
    },
    components: {
      AnimatedNumber
    },
    onPullDownRefresh: function() {
      let self = this;
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      setTimeout(()=>{
        wx.stopPullDownRefresh();
      }, 2000)
      // self.getUserInfo().then(() => {
      //   wx.hideNavigationBarLoading(); //完成停止加载
      //   wx.stopPullDownRefresh();
      // });
    },
    mounted() {
      // this.getUserInfo();
    },
    methods: {
      goAbout() {
        wx.navigateTo({ url: "./about/main?name=wuyanbin&age=24" });
      },
      goPublishLog() {
        wx.navigateTo({ url: "./log/main" });
      },
      // 查看创作的记录
      goMyCreate() {
        let self = this;
        if (self.createNum > 0) {
          wx.navigateTo({ url: "/pages/index/main" });
        } else {
          wx.showToast({
            title: "你还啥也没创作",
            icon: "none",
            duration: 2000
          });
        }
      },
      // 我要创作
      goToCreate(){
        wx.navigateTo({ url: "/pages/create/main" });
      },
      // 获取当前用户的信息
      async getUserInfo() {
        let self = this;
        await self.$http.getRequest("users/info").then((res) => {
          self.createNum = res.data.count_articles;
          self.getGoodNum = res.data.count_likes;
        });
      }
    }
  };
</script>

<style scoped>
  .UCenter-bg {
    background-image: url(https://6475-duanzi-fc5318-1258744718.tcb.qcloud.la/bg.png?sign=acf457434ea9affcc7f40f465ff01986&t=1607161192);
    background-size: cover;
    height: 550rpx;
    display: flex;
    justify-content: center;
    padding-top: 40rpx;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-weight: 300;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  .UCenter-bg text {
    opacity: 0.8;
  }

  .UCenter-bg image {
    width: 200rpx;
    height: 200rpx;
  }

  .UCenter-bg .gif-wave {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
  }

  .user-avatar {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    overflow: hidden;
    display: block;
    margin: 20rpx;
    margin-top: 50rpx;
    border: 2px solid #fff;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  }
</style>
