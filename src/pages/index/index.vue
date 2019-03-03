<template>
  <div>
    <!--内容-->
    <div class="cu-card case" v-for="item in items" :key="item.id">
      <!--内容信息-->
      <div class="cu-item shadow">
        <div class='padding-sm' @click="goDetail(item.id)">
          <div class='radius text-center shadow-blur bg-red'>
            <div class='padding text-white'>
              <div class='text-df text-left'>
                <wxParse :content="item.content"/>
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
            <div class='text-grey'>{{fillName(item)}}</div>
            <div class='text-gray text-sm flex justify-between'>
            {{fillTime(item)}}
            </div>
            </div>
            <!--点赞图标-->
            <div class="text-gray text-xxl flex-direction-row flex">
              <!--<div><span class='icon-appreciate lg text-gray margin-lr-xs'></span></div>-->
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
  import {formatTime} from "@/utils/index";
  import wxParse from 'mpvue-wxparse'

  export default {
    data() {
      return {
        items: [],
        isShowLoadMore: false,
        page: 1,
        totalPage: 1,
        article: '<div>我是HTML代码</div>'
      };
    },

    components: {
      isLoading: loading,
      wxParse
    },
    onShareAppMessage(res) {
      return {
        title: "每一个段子都值得被尊重",
        path: `/pages/detail/main?id=${res.target.dataset.id}`
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
      this.getArticle(1);
    },
    methods: {
      async getArticle(page) {
        let self = this;
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
        });
      },
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
      fillPic(src){
        console.log(src)
        return src ? src : 'https://image.weilanwl.com/img/square-4.jpg';
      },
      fillName(item){
        console.log(item);
        return item.userInfo.avatarUrl ? item.userInfo.avatarUrl : '佚名'
      },
      fillTime(item){
        return item ? formatTime(item.userInfo.time) : formatTime(new Date());
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
    width: 33px;
    height: 33px;
    border-radius: 50%;
    border: 1px solid #B9B9B9;
  }
</style>
