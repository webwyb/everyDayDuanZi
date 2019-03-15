<template>
  <div>
    <div class='UCenter-bg'>
      <div class="user-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class='text-xl margin-top-xs'>
        <open-data type="userNickName"></open-data>
      </div>
      <image src='https://duanzi.fengtianhe.cn/assets/images/wave.gif' mode='scaleToFill' class='gif-wave'></image>
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
          <text class='icon-github text-grey'></text>
          <text class='text-grey'>我的创作</text>
        </div>
      </div>
      <div class="cu-item arrow" @click="goAdvise">
        <div class='content'>
          <text class='icon-writefill text-cyan'></text>
          <text class='text-grey'>意见反馈</text>
        </div>
      </div>
      <div class="cu-item arrow">
        <div class='content' @click="goAbout">
          <text class='icon-github text-grey'></text>
          <text class='text-grey'>关于每日段子</text>
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
        createNum: 0,
        getGoodNum: 0
      };
    },
    components: {
      AnimatedNumber
    },
    onPullDownRefresh: function() {
      let self = this;
      self.createNum = 10;
      self.getGoodNum = 10;
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      setTimeout(function() {
        self.createNum = 0;
        self.getGoodNum = 0;
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh();
      }, 1000);
    },
    methods: {
      goAbout() {
        wx.navigateTo({ url: "./about/main?name=wuyanbin&age=24" });
      },
      goMyCreate(){
        wx.showToast({
          title: '你还啥也没创作',
          icon: 'none',
          duration: 2000
        })
      },
      goAdvise(){
        wx.showToast({
          title: '还敢有意见,等着吧',
          icon: 'none',
          duration: 2000
        })
      },
    }
  };
</script>

<style scoped>
  .UCenter-bg {
    background-image: url(https://duanzi.fengtianhe.cn/assets/images/bg.png);
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
