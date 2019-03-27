<template>
  <div>
    <div v-if="isAuth">
      <!--tab 切换-->
      <scroll-view scroll-x class="bg-green nav text-center">
        <view class='flex text-center'>
          <view :class="['0' === TabCur ? 'text-white cur' : '','cu-item', 'flex-sub' ]" @click='tabSelect' data-id="0">
            <text class='icon-camerafill'></text>
            文字
          </view>
          <view :class="['1' === TabCur ? 'text-white cur' : '','cu-item', 'flex-sub' ]" @click='tabSelect' data-id="1">
            <text class='icon-upstagefill'></text>
            图片
          </view>
        </view>
      </scroll-view>
      <!--内容输入区域-->
      <div style="margin-top: 5px">
        <div v-if="'0' === TabCur" style="position: relative">
            <textarea placeholder="是时候展示真正的技术了"
                      class="self-textArea"
                      maxlength="200"
                      auto-focus="false"
                      show-confirm-bar="true"
                      adjust-position="false"
                      placeholder-class='self-placeholder'
                      v-model="content"
                      @change="handleTextAreaChange"
            ></textarea>
            <div class="inputCount">{{content.length}}/200</div>
        </div>
        <div v-else style="height: 500rpx">
          aaa
        </div>
      </div>
      <view class="cu-form-group margin-top">
        <view class='title'>匿名发布</view>
        <switch></switch>
      </view>
      <!--发布-->
      <button class='cu-btn block line-orange lg margin-top' @click="publishContent">
        <text class='icon-upload'></text>
        发布
      </button>
    </div>
    <div v-else>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        // 是否认证
        isAuth: true,
        content: "",
        TabCur: "0",
        remnant: 200,
      };
    },
    mounted() {
      // console.log("上一个页面传来的数据", this.$root.$mp);
      this.wxlogin();
      this.getSetting();
    },
    methods: {
      // tab
      tabSelect(e) {
        console.log(e);
        let self = this;
        self.TabCur = e.currentTarget.dataset.id;
        // this.setData({
        //   TabCur: e.currentTarget.dataset.id,
        //   scrollLeft: (e.currentTarget.dataset.id-1)*60
        // })
      },
      //处理文本改变
      handleTextAreaChange(e) {
        console.log(e);
        console.log(e.target.value.length);
        let self = this;
        self.remnant = 200 - e.target.value.length;
        self.content = e.target.value;
      },
      //发布
      publishContent() {
        let self = this;
        self.$http.postRequest("articles", {
          content: self.content
        }).then((res) => {
          console.log("res", res);
        });
      },
      // 进入查看用户是否授权
      getSetting() {
        let self = this;
        wx.getSetting({
          success: function(res) {
            if (res.authSetting["scope.userInfo"]) {
              wx.getUserInfo({
                success: function(res) {
                  console.log("已经授权了");
                  console.log(res.userInfo);
                  self.isAuth = true;
                }
              });
            } else {
              console.log("用户还未授权");
              self.isAuth = false;
            }
          }
        });
      },
      //  获取用户公开数据
      onGotUserInfo(e) {
        let self = this;
        console.log(e);
        if (e.mp.detail.rawData) {
          console.log("用户按下了允许");
          console.log(e.mp.detail);
          self.isAuth = true;
        } else {
          console.log("用户按下拒绝");
          self.isAuth = false;
        }
      },
      // onGotUserInfo(item) {
      //   let self = this;
      //   if (!mpvue.getStorageSync("nickName") || !mpvue.setStorageSync("avatarUrl")) {
      //     wx.getUserInfo({
      //       withCredentials: true,
      //       success(res) {
      //         console.log("获取的用户信息", res);
      //         // self.userNickName = res.userInfo.nickName;
      //         // self.userAvatarUrl = res.userInfo.avatarUrl;
      //         mpvue.setStorageSync("nickName", res.userInfo.nickName);
      //         mpvue.setStorageSync("avatarUrl", res.userInfo.avatarUrl);
      //         self.$http.postRequest("users", {
      //           iv: res.iv,
      //           encryptData: res.encryptedData
      //         }).then((res) => {
      //           console.log("登录陈工", res);
      //         });
      //       }
      //     });
      //   } else {
      //     // self.sharePic(item.id, self.userNickName, self.userAvatarUrl);
      //     console.log(mpvue.getStorageSync("nickName"))
      //   }
      // },
      // 登录
      wxlogin() {
        let self = this;
        wx.login({
          success(res) {
            if (res.code) {
              // 发起网络请求
              self.$http.getRequest("users/login", {
                code: res.code
              }).then((res) => {
                mpvue.setStorageSync("token", res.data.token);
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
  .self-placeholder {
    color: transparent;
    font-size: 35rpx;
  }

  .self-textArea {
    height: 500rpx;
    overflow-y: scroll;
    width: 100vw;
    background: #fff;
    padding: 50rpx 25rpx;
    font-size: 30rpx;
  }
  .inputCount{
    position: absolute;
    top: 15rpx;
    right: 25rpx;
    font-size: 30rpx;
    color: gray
  }
</style>
