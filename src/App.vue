<script>
  export default {
    // created() {
    //   // 调用API从本地缓存中获取数据
    //   /*
    //    * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
    //    * 微信：mpvue === wx, mpvuePlatform === 'wx'
    //    * 头条：mpvue === tt, mpvuePlatform === 'tt'
    //    * 百度：mpvue === swan, mpvuePlatform === 'swan'
    //    * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
    //    */
    //
    //   let logs;
    //   if (mpvuePlatform === "my") {
    //     logs = mpvue.getStorageSync({ key: "logs" }).data || [];
    //     logs.unshift(Date.now());
    //     mpvue.setStorageSync({
    //       key: "logs",
    //       data: logs
    //     });
    //   } else {
    //     logs = mpvue.getStorageSync("logs") || [];
    //     logs.unshift(Date.now());
    //     mpvue.setStorageSync("logs", logs);
    //   }
    //  wx.login({
    //    success(res) {
    //      if (res.code) {
    //        // 发起网络请求
    //        console.log("发起网络请求", res.code);
    //        console.log("发起网络请求", res);
    //        wx.getUserInfo({
    //          withCredentials: true,
    //          success(res) {
    //            console.log("userInfo", res);
    //          }
    //        });
    //        wx.request({
    //          url: "https://duanzi.fengtianhe.cn/api/uses/login",
    //          data: {
    //            code: res.code
    //          }
    //        });
    //         // self.$http.get("/uses/login", {
    //         //   code: res.code
    //         // }, (res) => {
    //         //   console.log(res);
    //         // });
    //       } else {
    //         console.log("登录失败！" + res.errMsg);
    //       }
    //     }
    //   });
    // },
    // onLaunch() {
    //   let self = this;
    //   self.$http.get("/uses/login", {
    //     code: res.code
    //   }, (res) => {
    //     console.log(res);
    //   });
    // },
    // log() {
    //   console.log(`log at:${Date.now()}`);
    // }
    onError(err) {
      var fundebug = require("fundebug-wxjs");
      fundebug.notifyError(err);
    },
  };
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
