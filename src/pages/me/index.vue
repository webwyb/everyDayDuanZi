<template>
  <div>
    <div class='UCenter-bg'>
      <div class="user-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class='text-xl margin-top-xs'>
        <open-data type="userNickName"></open-data>
      </div>
      <image src='https://image.weilanwl.com/gif/wave.gif' mode='scaleToFill' class='gif-wave'></image>
    </div>
    <!--创作和点赞详情-->
    <div class='padding flex text-center text-grey bg-white shadow-warp'>
      <div class='flex flex-sub flex-direction solid-right'>
        <div class="text-xxl text-orange">{{createNum}}</div>
        <div class="margin-top-sm">
          <text class='icon-attentionfill'></text>
          创作
        </div>
      </div>
      <div class='flex flex-sub flex-direction'>
        <div class="text-xxl text-blue">{{getGoodNum}}</div>
        <div class="margin-top-sm">
          <text class='icon-favorfill'></text>
          获赞
        </div>
      </div>
    </div>
    <!--链接页面-->
    <div class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
      <div class="cu-item arrow">
        <div class='content'>
          <text class='icon-github text-grey'></text>
          <text class='text-grey'>我的创作</text>
        </div>
      </div>
      <div class="cu-item arrow">
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
  export default {
    name: "index",
    data() {
      return{
        createNum: 100,
        getGoodNum: 200
      }
    },
    onShow(){

    },
    onPullDownRefresh: function(){
      // wx.startPullDownRefresh()
      wx.showNavigationBarLoading() //在标题栏中显示加载
      setTimeout(function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh()
      },3000)
    },
    methods: {
      goAbout(){
        console.log('aaa');
        let self = this
        // setTimeout(function() {
        //   self.createNum = 900;
        //   self.getGoodNum = 100
        // },2000)
        // this.$router.push({path: "pages/me/about/main"})
        wx.navigateTo({url: './about/main?name=wuyanbin&age=24'})
      }
    }
  };
</script>

<style scoped>
  .UCenter-bg {
    background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
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
    overflow:hidden;
    display: block;
    margin: 20rpx;
    margin-top: 50rpx;
    border: 2px solid #fff;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  }
</style>
