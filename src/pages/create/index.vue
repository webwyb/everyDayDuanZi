<template>
  <div>
    <div>
      <!--tab 切换-->
      <scroll-view scroll-x class="bg-green nav text-center">
        <view class='flex text-center'>
          <view :class="['0' === TabCur ? 'text-white cur' : '','cu-item', 'flex-sub' ]" @click='tabSelect' data-id="0">
            <text class='icon-upstagefill'></text>
            文字
          </view>
          <view :class="['1' === TabCur ? 'text-white cur' : '','cu-item', 'flex-sub' ]" @click='tabSelect' data-id="1">
            <text class='icon-camerafill'></text>
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
                      show-confirm-bar="true"
                      adjust-position="false"
                      placeholder-class='self-placeholder'
                      v-model="content"
                      @change="handleTextAreaChange"
            ></textarea>
          <div class="inputCount">{{content.length}}/200</div>
        </div>
        <div v-else style="height: 500rpx">
          被发现了，下期支持吧
        </div>
      </div>
      <view class="cu-form-group margin-top">
        <view class='title'>匿名发布</view>
        <switch @change="handleSwitchChange"></switch>
      </view>
      <!--发布-->
      <div class="padding">
        <button class='cu-btn block bg-green lg margin-top' @click="publishContent">
          <text class='icon-upload'></text>
          发布
        </button>
      </div>
    </div>
    <!-- <div v-else class="user-login-container">
      <button open-type="getUserInfo" @getuserinfo="onGotUserInfo">
        <div class='user-avatar'>
          <img src="../../../static/images/avatar.png" alt="">
        </div>
        <div class="tip">点击登录</div>
      </button>
    </div> -->
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
        //是否匿名
        isAnonymous: 0
      };
    },
    mounted() {
      // console.log("上一个页面传来的数据", this.$root.$mp);
      // this.getSetting();
    },
    methods: {
      // tab
      tabSelect(e) {
        let self = this;
        self.TabCur = e.currentTarget.dataset.id;
      },
      //处理文本改变
      handleTextAreaChange(e) {
        let self = this;
        self.remnant = 200 - e.target.value.length;
        self.content = e.target.value;
      },
      //处理switch的改变
      handleSwitchChange(e) {
        this.isAnonymous = e.mp.detail.value;
      },
      //发布
      publishContent() {
        let self = this;
        if (self.content.length <= 15) {
          wx.showToast({
            title: "就这几个字,让我怎么交差",
            icon: "none",
            duration: 2000
          });
        } else {
          const db = wx.cloud.database()
          db.collection('articles').add({
            data: {
              content: self.content,
              creator:{
                  avatar:"https://6475-duanzi-fc5318-1258744718.tcb.qcloud.la/avatar.png?sign=4d13a68b88da2b3c116340f72faa5f53&t=1607076202",
                  created_at: new Date(),
                  nickname:"不方便透漏姓名"
              }
            },
            success: res => {
              // 在返回结果中会包含新创建的记录的 _id
              wx.showToast({
                title: '新增记录成功',
              })
              self.content = '';
              console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '新增记录失败'
              })
              console.error('[数据库] [新增记录] 失败：', err)
            }
          })
        }
      },
      // 进入查看用户是否授权
      getSetting() {
        let self = this;
        wx.getSetting({
          success: function(res) {
            if (res.authSetting["scope.userInfo"]) {
              wx.getUserInfo({
                success: function(res) {
                  self.isAuth = true;
                }
              });
            } else {
              self.isAuth = false;
            }
          }
        });
      },
      //  获取用户公开数据
      onGotUserInfo(e) {
        let self = this;
        if (e.mp.detail.rawData) {
          self.$http.postRequest("users", {
            iv: e.mp.detail.iv,
            encryptData: e.mp.detail.encryptedData
          }).then((res) => {
            self.isAuth = true;
          });
        } else {
          self.isAuth = false;
        }
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
    -webkit-overflow-scrolling: touch;
    width: 100vw;
    background: #fff;
    padding: 50rpx 25rpx;
    font-size: 30rpx;
  }

  .inputCount {
    position: absolute;
    top: 15rpx;
    right: 25rpx;
    font-size: 30rpx;
    color: gray
  }

  .user-login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .user-avatar {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    overflow: hidden;
    display: block;
    margin: 20rpx;
    border: 2px solid #fff;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  }

  .user-avatar img {
    width: 100%;
    height: 100%;
  }

  .tip {
    color: gray;
  }
</style>
