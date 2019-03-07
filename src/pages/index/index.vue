<template>
  <div>
    <!--内容-->
    <div style="background: red">storage</div>
    <button open-type="getUserInfo" lang="zh_CN" @click="onGotUserInfo">获取用户信息</button>
    <div class="cu-card case" v-for="item in items" :key="item.id">
      <!--内容信息-->
      <div class="cu-item shadow">
        <div class='padding-sm' @click="goDetail(item.id)">
          <div class='radius text-center shadow-blur bg-gradual-green'>
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
            <!--用户信息 :style="{'background-image':'url(' + fillPic(item.userInfo.avatarUrl) + ')'}-->
            <div class="cu-avatar round lg"
                 :style="{'background-image':'url(' + 'https://image.weilanwl.com/img/square-4.jpg' + ')'}">
            </div>
            <div class='content flex-sub'>
              <div class='text-grey'>{{nickName}}</div>
              <div class='text-gray text-sm flex justify-between'>
                {{createDate}}
              </div>
            </div>
            <!--点赞图标-->
            <div class="text-gray text-xxl flex-direction-row flex" style="align-items: center">
              <div @click="giveGood(item)">
                <span class='icon-appreciatefill lg text-gray margin-lr-xs' v-if="item.goodIconHasClicked"></span>
                <span class="icon-appreciate lg text-gray margin-lr-xs" v-else></span>
              </div>
              <div>
                <button open-type="share" :data-id="item.id"><span
                  class="icon-share lg text-gray margin-lr-xs"></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--加载更多-->
    <isLoading :isShowLoadMore="isShowLoadMore" />
    <!--置顶-->
    <div class="toTop" @click="toTop"><span class='icon-top xl text-gray'></span></div>
  </div>
</template>

<script>
  import loading from "@/components/loading";
  import { formatTime } from "@/utils/index";
  import wxParse from "mpvue-wxparse";

  export default {
    data() {
      return {
        items: [
          {
            id: '1',
            content: 'wuyanbin',
            nickName: '111',
            createDate: '2092-3323-23',
            goodIconHasClicked: false
          },{
            id: '2',
            content: 'wuyanbin',
            nickName: '111',
            createDate: '2092-3323-23',
            goodIconHasClicked: false
          },{
            id: '3',
            content: 'wuyanbin',
            nickName: '111',
            createDate: '2092-3323-23',
            goodIconHasClicked: false
          }
        ],
        nickName: "不愿透漏姓名的段友",
        createDate: "2019-03-01",
        isShowLoadMore: false,
        page: 1,
        totalPage: 1,
        goodIconHasClicked: true
      };
    },

    components: {
      isLoading: loading,
      wxParse
    },
    onShareAppMessage(res) {
      // wx.showLoading({
      //   title: "加载中"
      // });
      return {
        title: "每一个段子都值得被尊重",
        path: `/pages/detail/main?id=${res.target.dataset.id}`,
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
    // 上拉刷新
    onPullDownRefresh: function() {
      let self = this;
      self.page = 1;
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      self.getArticle(self.page).then(() => {
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh();
      });
    },
    // 下拉加载更多
    onReachBottom: function() {
      let self = this;
      if (self.page <= self.totalPage) {
        self.page = self.page + 1;
        console.log("我要加载更多数据", self.page);
        self.isShowLoadMore = true;
        self.getArticle(self.page).then(() => {
          self.isShowLoadMore = false;
        });
      } else {
        console.log("无数据了");
      }
    },
    mounted() {
      this.wxlogin();
      // this.getArticle(1);
    },
    methods: {
      // 获取文章
      async getArticle(page) {
        let self = this;
        wx.showLoading({
          title: "加载中"
        });
        await self.$http.getRequest("articles", {
          page: page,
          pageSize: "5"
        }).then((res) => {
          self.totalPage = res.data.totalPage;
          if (page === 1) {
            this.items = res.data.lists;
          } else {
            this.items = this.items.concat(res.data.lists);
          }
        }).catch((err) => {
          console.log("请求到的苏剧", err);
        }).finally(() => {
          wx.hideLoading();
        });
      },
      // 返回顶部
      toTop() {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
      },
      // 查看详情
      goDetail(id = "1") {
        wx.navigateTo({ url: `/pages/detail/main?id=${id}` });
      },
      // 登录
      wxlogin() {
        let self = this;
        wx.login({
          success(res) {
            if (res.code) {
              // 发起网络请求
              console.log("发起网络请求", res.code);
              self.$http.getRequest("users/login", {
                code: res.code
              }).then((res) => {
                console.log("发起resres网络请求", res);
                mpvue.setStorageSync("token", res.data.token);
                self.getArticle(1);
              });
            } else {
              console.log("登录失败！" + res.errMsg);
            }
          }
        });
      },
      //  获取用户公开数据
      onGotUserInfo() {
        let self = this;
        wx.getUserInfo({
          withCredentials: true,
          success(res) {
            console.log("获取的用户信息", res);
            self.$http.postRequest("users", {
              iv: res.iv,
              encryptData: res.encryptedData
            }).then((res) => {
              console.log("登录陈工", res);
            });
          }
        });
      },
      // 点赞
      giveGood(item) {
        // console.log("当亲的id", id);
        // let self = this;
        // self.goodIconHasClicked = !self.goodIconHasClicked;
        item.goodIconHasClicked = !item.goodIconHasClicked;
      }
    }
  };
</script>

<style scoped>
  button::after {
    border: none;
  }

  button {
    background-color: #fff;
  }

  .toTop {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #fff;
    position: fixed;
    right: 20px;
    bottom: 40px;
    z-index: 10;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #B9B9B9;
  }
</style>
