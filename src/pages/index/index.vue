<template>
  <div>
    <!--内容-->
    <official-account></official-account>
    <div class="cu-card case" v-for="item in items" :key="item.id">
      <div class="cu-item shadow">
        <!--消息状态-->
        <div class='item-status'>{{item.status === 1 ? "审核中" : "审核通过" }}</div>
        <!--内容信息-->
        <div class='padding-sm' @click="goDetail(item.id)">
          <div class='radius text-center shadow-blur bg-gradual-green'>
            <div class='padding text-white'>
              <div class='text-lg text-left'>
                {{item.content}}
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
                <span>{{item.likes_count}}</span>
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
    <!--加载更多-->
    <isLoading :isShowLoadMore="isShowLoadMore" />
    <!--置顶-->
    <toTop />
  </div>
</template>

<script>
  import loading from "@/components/loading";
  import ToTop from "@/components/toTop";
  import { formatTime } from "@/utils/index";

  export default {
    data() {
      return {
        items: [],
        nickName: "不愿透漏姓名的段友",
        createDate: "2019-03-01",
        isShowLoadMore: false,
        page: 1,
        totalPage: 1,
        // 当前用户的信息
        userNickName: "",
        userAvatarUrl: "",
        defaultAvatar: "https://6475-duanzi-fc5318-1258744718.tcb.qcloud.la/my-image.png?sign=69de71f60b859c68a9d078ef86015de9&t=1607161264",
        defaultNickName: "不愿透漏姓名的段友",
        defaultCreateDate: "2019-3-15"
      };
    },

    components: {
      isLoading: loading,
      toTop: ToTop,
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
      self.page = self.page + 1;
      console.log("我要加载更多数据", self.page);
      self.isShowLoadMore = true;
      self.getArticle(self.page).then(() => {
        self.isShowLoadMore = false;
      });
    },
    mounted() {
      // this.getArticle(1);
    },
    methods: {
      // 生成图片
      sharePic(id) {
        wx.navigateTo({ url: `/pages/painter/main?id=${id}&userNickName=${this.userNickName}&userAvatarUrl=${this.userAvatarUrl}` });
      },
      // 获取文章
      async getArticle(page) {
        let self = this;
        wx.showLoading({
          title: "加载中"
        });
        await self.$http.getRequest("articles/all", {
          page: page,
          pageSize: 10
        }).then((res) => {
          // self.totalPage = res.data.totalPage;
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
      // 查看详情
      goDetail(id = "1") {
        wx.navigateTo({ url: `/pages/detail/main?id=${id}` });
      },
      // 点赞
      giveGood(item) {
        let self = this;
        if (!item.isLike) {
          self.$http.postRequest(`articles/like/${item.id}`).then(() => {
            item.isLike = true;
          });
        } else {
          console.log("已经喜欢了");
        }
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
    margin-left: 0;
    margin-right: 0;
    padding-right: 0;
    padding-left: 0;
  }

  .item-status {
    padding: 20rpx 20rpx;
    font-size: 30rpx;
  }
</style>
